const Joi = require('joi');

const id = Joi.string().uuid();
const title = Joi.string();
const description = Joi.string();

const createTaskSchema = Joi.object({
  title: title.required(),
  description: description.required(),
});

const updateTaskSchema = Joi.object({
  title: title,
  description: description
});

const getTaskSchema = Joi.object({
  id: id.required(),
});

module.exports = { createTaskSchema: createTaskSchema, getTaskSchema: getTaskSchema, updateTaskSchema: updateTaskSchema }
