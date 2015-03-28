/**
 * keyMirror creates pseudo-enums by mirror keys onto the values 
 */
var keyMirror = require('keymirror');

module.exports = keyMirror({
  TODO_CREATE: null,
  TODO_COMPLETE: null,
  TODO_DESTROY: null,
  TODO_DESTROY_COMPLETED: null,
  TODO_TOGGLE_COMPLETE_ALL: null,
  TODO_UNDO_COMPLETE: null,
  TODO_UPDATE_TEXT: null
});