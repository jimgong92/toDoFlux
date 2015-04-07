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
    ToDo.findOne({_id: id}, function(err, data){
      if(err){
        console.log("Error in Get ToDo");
      }
      if(callback) callback();
    })

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
    ToDo.update({}, {isCompleted: true}, function(err, data){
      if(err){
        console.log("Error in toggleAllComplete");
        console.log(err);
      }
      if(callback) callback();
    });
  },
  toggleAllIncomplete: function(callback){
    ToDo.update({}, {isCompleted: false}, function(err, data){
      if(err){
        console.log("Error in toggleAllComplete");
        console.log(err);
      }
      if(callback) callback();
    });
  },
  toggleComplete: function(id, callback){
    ToDo.update({_id: id}, {isCompleted: true}, function(err, data){
      if (err){
        console.log("Error in toggleComplete");
        console.log(err);
      }
      if(callback) callback();
    });
  },
  toggleIncomplete: function(id, callback){
    ToDo.update({_id: id}, {isCompleted: false}, function(err, data){
      if (err){
        console.log("Error in toggleComplete");
        console.log(err);
      }
      if(callback) callback();
    });
  }
  removeAllComplete: function(){
    ToDo.remove({isCompleted: true}, function(err){
      if (err){
        console.log("Error removing completed ToDo(s)")
      }
    })
  },
  removeToDo: function(id, callback){
    ToDo.remove({_id: id}, function(err){
      if (err){
        console.log("Error removing ToDo");
      }
    })
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