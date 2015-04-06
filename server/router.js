module.exports = function(app){
  /**
   * Get All Todos
   */
  app.get('/api/todos', function(req, res){
    res.sendStatus(200);
  });
  /** 
   * Add ToDo
   */
  app.post('/api/todos', function(req, res){

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