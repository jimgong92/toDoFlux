var React = require('react');
/**
 * Actions
 */
var TodoActions = require('../actions/TodoActions');
var TodoTextInput = require('./TodoTextInput');

var Header = React.createClass({
  _onSave: function(text){
    if (text.trim()){
      TodoActions.create(text);
    }
  },
  render: function(){
    return (
      <header id="header">
        <h1>todos</h1>
        <TodoTextInput 
          id="new-todo"
          placeholder="What needs to be done?"
          _onSave={this._onSave} />
      </header>
    );
  }
});

module.exports = Header;