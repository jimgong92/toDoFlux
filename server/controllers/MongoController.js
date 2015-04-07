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
  getToDo: function(_id, callback){
    ToDo.findOne({_id: _id}, function(err, data){
      console.log("Single");
      if(err){
        console.log("Error in Get ToDo");
      }
      if(callback) callback(data);
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
  editToDo: function(_id, text, callback){
    ToDo.update({_id: _id}, {text: text}, function(err, data){
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
  toggleComplete: function(_id, callback){
    ToDo.update({_id: _id}, {isCompleted: true}, function(err, data){
      if (err){
        console.log("Error in toggleComplete");
        console.log(err);
      }
      if(callback) callback();
    });
  },
  toggleIncomplete: function(_id, callback){
    ToDo.update({_id: _id}, {isCompleted: false}, function(err, data){
      if (err){
        console.log("Error in toggleComplete");
        console.log(err);
      }
      if(callback) callback();
    });
  },
  removeAllComplete: function(){
    ToDo.remove({isCompleted: true}, function(err){
      if (err){
        console.log("Error removing completed ToDo(s)")
      }
    })
  },
  removeToDo: function(_id, callback){
    ToDo.remove({_id: _id}, function(err){
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