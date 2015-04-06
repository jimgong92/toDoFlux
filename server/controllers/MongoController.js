var ToDo = require('../models/ToDo');

module.exports = {
  getAllToDos: function(callback){
    ToDo.find({}, function(err, todos){
      if (err){
        console.log("Error in Get All ToDos");
        console.log(err);
      }
      if(callback){
        callback(todos);
      }
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