const express = require('express');
const taskService = require('../services/task.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createTaskSchema, updateTaskSchema, getTaskSchema } = require('./../schemas/task.schema');

const router = express.Router();
const service = new taskService();

router.get('/', async (req, res) =>{
  const products = await service.find();
  res.json(products);
});

router.get('/:id',
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
  validatorHandler(createTaskSchema, 'body'),
  async (req, res) => {
  const body = req.body;
  const newTask = service.create(body);
  res.status(201).json(newTask);
})

router.patch('/:id',
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

router.delete('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const rta = await service.delete(id);
    res.json(rta);
  } catch (error){
    next(error);
  }
})

module.exports = router;
