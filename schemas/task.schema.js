const Joi = require('joi');

const id = Joi.string().uuid();
const title = Joi.string();
const description = Joi.string();
const date = Joi.date();
const userId = Joi.string().uuid();

const createTaskSchema = Joi.object({
  title: title.required(),
  description: description.required(),
  date: date.required(),
  userId: userId.required()
});

const updateTaskSchema = Joi.object({
  title: title,
  description: description,
  date: date,
  userId: userId
});

const getTaskSchema = Joi.object({
  id: id.required(),
});

module.exports = { createTaskSchema: createTaskSchema, getTaskSchema: getTaskSchema, updateTaskSchema: updateTaskSchema }
