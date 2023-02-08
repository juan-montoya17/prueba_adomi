const express = require('express');
const passport = require('passport');

const taskService = require('../services/task.service');
const validatorHandler = require("../middlewares/validator.handler");
const {createTaskSchema, getTaskSchema, updateTaskSchema} = require("../schemas/task.schema");

const router = express.Router();
const service = new taskService();

router.get('/my-tasks',
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    try{
      const user = req.user;
      const tasks = await service.findByUser(user.sub);
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/my-tasks/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getTaskSchema, 'params'),
  async (req, res, next) => {
    try{
      const user = req.user;
      const task = await service.finOneByUser(user.sub, req.params.id);
      delete task.dataValues.user;
      res.json(task);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/update-my-task/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getTaskSchema, 'params'),
  async (req, res, next) => {
    try{
      const user = req.user;
      const task = await service.finOneByUser(user.sub, req.params.id);
      delete task.dataValues.user;
      const rta = await service.update(task.id, req.body);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/delete-my-task/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getTaskSchema, 'params'),
  async (req, res, next) => {
    try{
      const user = req.user;
      const task = await service.finOneByUser(user.sub, req.params.id);
      delete task.dataValues.user;
      const rta = await service.delete(task.id);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
