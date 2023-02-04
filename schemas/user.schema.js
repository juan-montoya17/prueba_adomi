const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string();
const email = Joi.string().email();
const password = Joi.string().min(8);

const createUserSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
});

const updateUserSchema = Joi.object({
  name: name,
  email: email,
  password: password
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema: createUserSchema, getUserSchema: getUserSchema, updateUserSchema: updateUserSchema }
