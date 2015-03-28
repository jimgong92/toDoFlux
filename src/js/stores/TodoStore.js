var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _todos = {};

/**
 * Create a TODO item
 */
function create(text){
  var id = (Number(new Date()) + Math.floor(Math.random() * 9999)).toString(36);
  _todos[id] = {
    id: id,
    complete: false,
    text: text
  };
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