var React = require('react');

/**
 * Component Requirements
 */
var Header = require('./Header');
var Footer = require('./Footer');
var MainSection = require('./MainSection');
/**
 * Store and getter helpers
 */
var TodoStore = require('../stores/TodoStore')
function getTodoState(){
  return {
    allTodos: TodoStore.getAll(),
    areAllComplete: TodoStore.areAllComplete()
  };
};
/**
 * View
 */
var TodoApp = React.createClass({
  getInitialState: function(){
    return getTodoState();
  },
  componentDidMount: function(){
    TodoStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    TodoStore.removeChangeListener(this._onChange);
  },
  _onChange: function(){
    this.setState(getTodoState());
  },
  render: function(){
    return (
      <div>
        <Header />
        <MainSection allTodos={this.state.allTodos} areAllComplete={this.state.areAllComplete} />
        <Footer allTodos={this.state.allTodos} />
      </div>
    );
  }
});

module.exports = TodoApp;