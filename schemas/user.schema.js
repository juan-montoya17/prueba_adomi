const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string();
const email = Joi.string().email();
const password = Joi.string().min(8);
const cell = Joi.string().min(10).max(10);

const createUserSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  cell: cell.required(),
});

const updateUserSchema = Joi.object({
  name: name,
  email: email,
  cell: cell,
  password: password
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema: createUserSchema, getUserSchema: getUserSchema, updateUserSchema: updateUserSchema }
