var MongoController = require('./controllers/MongoController');

module.exports = function(app){
  /**
   * Get All Todos
   */
  app.get('/api/todos', function(req, res){
    MongoController.getAllToDos(function(todos){
      console.log("Successfully retrieved all ToDos");
      console.log(todos);
      res.sendStatus(200);
    })
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
    var id = req.body.id,
        text = req.body.text;
    MongoController.editToDo(id, text, function(){
      console.log("Successfully edited ToDo in DB");
      res.sendStatus(201);
    });
  });
  /**
   * Toggle whether ToDo(s) complete
   */
  app.post('/api/toggle', function(req, res){
    if(req.body.id){
      MongoController.toggle(req.body.id);
    }
    else {
      MongoController.toggleAllComplete();
    }
    res.sendStatus(201);
  });
  /**
   * Remove ToDo(s)
   */
  app.post('/api/remove', function(req, res){
    //Remove single ToDo
    if(req.body.id){
      MongoController.remove(req.body.id);
    }
    //Remove ToDos marked completed
    else {
      MongoController.removeAllComplete();
    }
    res.sendStatus(201);
  });
};