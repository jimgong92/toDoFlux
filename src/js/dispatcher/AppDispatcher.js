var Flux = require('flux');
var assign = require('object-assign');

var AppDispatcher = assign(new Flux.Dispatcher(), {
  handleViewAction: function (action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }
});

module.exports = AppDispatcher;