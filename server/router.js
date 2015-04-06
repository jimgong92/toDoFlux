var MongoController = require('./controllers/MongoController');

module.exports = function(app){
  /**
   * Get All Todos
   */
  app.get('/api/todos', function(req, res){
    MongoController.getAllToDos(function(todos){
      console.log("Successfully retrieved all ToDos");
      console.log(todos);
    })
    res.sendStatus(200);
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
    });
    res.sendStatus(201);
  });
  /**
   * Toggle whether ToDo(s) complete
   */
  app.get('/api/toggle', function(req, res){

  });
  /**
   * Remove ToDo(s)
   */
  app.post('/api/remove', function(req, res){

  });
};