const express = require('express');
const taskService = require('../services/task.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createTaskSchema, updateTaskSchema, getTaskSchema } = require('./../schemas/task.schema');
const passport = require("passport");

const router = express.Router();
const service = new taskService();

router.get('/',
  passport.authenticate('jwt', {session: false}),
  async (req, res) =>{
  const tasks = await service.find();
  res.json(tasks);
});

router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getTaskSchema, 'params'),
  async (req,res ,next) =>{
  try {
    const {id} = req.params;
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
}
);

router.post('/',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(createTaskSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newTask = await service.create(body);
      console.log(newTask);
      res.status(201).json(newTask);
    } catch (error) {
      next(error);
    }
});

router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getTaskSchema, 'params'),
  validatorHandler(updateTaskSchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const  task = await service.update(id, body);
    res.json(task);
  } catch (error){
    next(error);
  }
})

router.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
  try {
    const {id} = req.params;
    const rta = await service.delete(id);
    res.json(rta);
  } catch (error){
    next(error);
  }
})

module.exports = router;
