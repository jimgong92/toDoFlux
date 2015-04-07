var MongoController = require('./controllers/MongoController');

module.exports = function(app){
  /**
   * Get All Todos
   */
  app.get('/api/todos', function(req, res){
    var _id = req.query._id;
    console.log(_id);
    if(_id){
      MongoController.getToDo(_id, successfulGet);
    }
    else {
      MongoController.getAllToDos(successfulGet);
    }
    function successfulGet(todos){
      console.log("Successfully retrieved all ToDos");
      console.log(todos);
      res.sendStatus(todos);
    }
  });
  /** 
   * Add ToDo
   */
  app.post('/api/todos', function(req, res){
    var newToDo = {
      text: req.body.text,
      isCompleted: false
    };
    MongoController.addToDo(newToDo, function(){
      console.log("Successfully added ToDo to DB");
      res.sendStatus(201);
    });
  });
  /**
   * Edit ToDo
   */
  app.post('/api/edit', function(req, res){
    var _id = req.body._id,
        text = req.body.text;
    MongoController.editToDo(_id, text, function(){
      console.log("Successfully edited ToDo in DB");
      res.sendStatus(201);
    });
  });
  /**
   * Toggle whether ToDo(s) complete
   */
  app.post('/api/toggle', function(req, res){
    var _id = req.body._id,
        complete = req.body.complete;
    if(_id){
      if (complete) {
        MongoController.toggleComplete(_id, successfulToggle);
      }
      else {
        MongoController.toggleIncomplete(_id, successfulToggle); 
      }
    }
    else {
      if (complete){
        MongoController.toggleAllComplete(successfulToggle);
      }
      else {
        MongoController.toggleAllIncomplete(successfulToggle);
      }
    }
    function successfulToggle(){
      console.log("Successfully toggled");
      res.sendStatus(201);
    }
  });
  /**
   * Remove ToDo(s)
   */
  app.post('/api/remove', function(req, res){
    var _id = req.body._id;
    //Remove single ToDo
    if(_id){
      MongoController.removeToDo(_id, successfulRemove);
    }
    //Remove ToDos marked completed
    else {
      MongoController.removeAllComplete(successfulRemove);
    }
    function successfulRemove(){
      console.log("Successful remove");
      res.sendStatus(201);
    }
  });
};