const express = require('express');
const usersService = require('../services/user.service');
const { createUserSchema, updateUserSchema, getUserSchema } = require('../schemas/user.schema');
const validatorHandler = require('../middlewares/validator.handler');
const passport = require("passport");

const router = express.Router();
const service = new usersService();

router.get('/', async (req, res) => {
  const users = await service.find();
  res.json(users);
});

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
});

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
  try {
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
  });

router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const body = req.body;
      const user = await service.update(id, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  });

router.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
  try {
    const {id} = req.params;
    const rta = await service.delete(id);
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
