var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants');
var assign = require('object-assign');
var $ = require('jquery');

var CHANGE_EVENT = 'change';

var _todos = {};

/**
 * Create a TODO item
 */
function create(text, callback){
  $.ajax({
    url: window.location.origin + '/api/todos',
    type: 'POST',
    data: JSON.stringify({text: text}),
    contentType: 'application/json',
    success: function(data){
      var _id = data._id;
      _todos[_id] = {
        _id: _id,
        isCompleted: false,
        text: text
      };
      callback();
    },
    error: function(err){
      console.error("Error creating TODO");
      console.error(err);
    }
  });
}

/**
 * Update a TODO item
 * @param {string} id
 * @param {object} updates An object literal containing only the data to be updated
 */
function update(id, updates){
  _todos[id] = assign({}, _todos[id], updates);
}

/**
 * Updates all of the TODO items with the same object
 */
function updateAll(updates){
  for (var id in _todos){
    update(id, updates);
  }
}

/**
 * Delete a TODO item
 */
function destroy(id){
  delete _todos[id];
}

/**
 *  Destroys all completed TODOs
 */
function destroyCompleted(){
  for (var id in _todos){
    if (_todos[id].complete){
      destroy(id);
    }
  }
}

var TodoStore = assign({}, EventEmitter.prototype, {
  /**
   * Tests whether all the remaining TODO items are marked as completed
   */
  areAllComplete: function(){
    for (var id in _todos){
      if (!_todos[id].complete){
        return false;
      }
    }
    return true;
  },
  /**
   * Get the entire collection of TODOs
   */
  getAll: function(){
    return _todos;
  },

  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback);
  }
});

/**
 * Register callback to handle all updates
 */
AppDispatcher.register(function(action){
  var text;

  switch(action.actionType){
    case TodoConstants.TODO_CREATE:
      text = action.text.trim();
      if (text !== ''){
        create(text, success);
        function success(){
          TodoStore.emitChange();
        }
      }
      break;

    case TodoConstants.TODO_TOGGLE_COMPLETE_ALL:
      if (TodoStore.areAllComplete()){
        updateAll({complete: false});
      }
      else {
        updateAll({complete: true});
      }
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_UNDO_COMPLETE:
      update(action.id, {complete: false});
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_COMPLETE:
      update(action.id, {complete: true});
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_UPDATE_TEXT:
      text = action.text.trim();
      if (text !== ''){
        update(action.id, {text: text});
        TodoStore.emitChange();
      }
      break;

    case TodoConstants.TODO_DESTROY:
      destroy(action.id);
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_DESTROY_COMPLETED:
      destroyCompleted();
      TodoStore.emitChange();
      break;

    default:
      //no op
  }
});

module.exports = TodoStore;