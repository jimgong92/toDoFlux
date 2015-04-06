var ToDo = require('../models/ToDo');

module.exports = {
  getAllToDos: function(){
    ToDo.find({}, function(err, todos){
      console.log("Error in Get All ToDos");
      console.log(err);
    });
  },
  getToDo: function(id){

  },
  addToDo: function(newToDo, callback){
    ToDo.create(newToDo, function(err, todo){
      if(err){
        console.log("Error in Add New ToDo");
        console.log(err);
      }
      if(callback) callback(todo);
    });
  },
  toggleAllComplete: function(){

  },
  toggleComplete: function(id){

  },
  removeAllComplete: function(){

  },
  removeToDo: function(id){
    
  }
};