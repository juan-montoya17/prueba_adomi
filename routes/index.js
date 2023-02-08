const express = require('express');
const tasksRouter = require('./tasks.router');
const usersRouter = require('./users.router');
const authRouter = require('./auth.router');
const profileRouter = require('./profile.router');

function routerApi(app){
  const  router = express.Router();
  app.use('/api/v1', router);
  router.use('/tasks', tasksRouter);
  router.use('/users', usersRouter);
  router.use('/auth', authRouter);
  router.use('/profile', profileRouter);
}

module.exports = routerApi;
