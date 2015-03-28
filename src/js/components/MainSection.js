var React = require('react');
var ReactPropTypes = React.PropTypes;

var TodoActions = require('../actions/TodoActions');
var TodoItem = require('./TodoItem');

var MainSection = React.createClass({
  propTypes: {
    allTodos: ReactPropTypes.object.isRequired,
    areAllComplete: ReactPropTypes.bool.isRequired
  },
  _onToggleCompleteAll: function(){
    TodoActions.toggleCompleteAll();
  },
  render: function(){
    if (Object.keys(this.props.allTodos).length < 1){
      return null;
    }
    var allTodos = this.props.allTodos;
    var todos = [];

    for (var key in allTodos){
      todos.push(<TodoItem key={key} todo={allTodos[key]} />);
    }

    return (
      <section id="main">
        <input
          id="toggle-all"
          type="checkbox"
          onChange={this._onToggleCompleteAll}
          checked={this.props.areAllComplete ? "checked" : ""} />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul id="todo-list">{todos}</ul>
      </section>
    );
  }
});

module.exports = MainSection;