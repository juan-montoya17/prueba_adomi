const express = require('express');
const tasksRouter = require('./tasks.router');
const usersRouter = require('./users.router');

function routerApi(app){
  const  router = express.Router();
  app.use('/api/v1', router);
  router.use('/tasks', tasksRouter);
  router.use('/users', usersRouter);
}

module.exports = routerApi;
