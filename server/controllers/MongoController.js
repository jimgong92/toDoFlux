var ToDo = require('../models/ToDo');

/**
 * Handles interaction MongoDB
 */
module.exports = {
  getAllToDos: function(callback){
    ToDo.find({}, function(err, data){
      if (err){
        console.log("Error in Get All ToDos");
        console.log(err);
      }
      if(callback){
        callback(data);
      }
    });
  },
  getToDo: function(id, callback){
  },
  addToDo: function(newToDo, callback){
    ToDo.create(newToDo, function(err, data){
      if(err){
        console.log("Error in Add New ToDo");
        console.log(err);
      }
      if(callback) callback(data);
    });
  },
  editToDo: function(id, text, callback){
    ToDo.update({_id: id}, {text: text}, function(err, data){
      if(err){
        console.log("Error in Edit ToDo");
        console.log(err);
      }
      console.log("Edited ToDo");
      console.log(data);
      if(callback) callback();
    });
  },
  toggleAllComplete: function(callback){
  },
  toggleComplete: function(id){
  },
  removeAllComplete: function(){

  },
  removeToDo: function(id){

  }
};

/**
 * Dev Helper Functions
 * Plug-n-play
 */
function clearDB(){
  ToDo.remove({}, function(err){
    if (err){
      console.log("Error clearing database");
      console.log(err);
    }
  });
}