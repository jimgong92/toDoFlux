var mongoose = require('mongoose');

var ToDoSchema = new mongoose.Schema({
  text: String,
  isCompleted: Boolean
});

module.exports = mongoose.model('ToDo', ToDoSchema);