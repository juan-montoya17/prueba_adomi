const boom = require("@hapi/boom");

const { models } = require('../libs/sequelize.js');

class TaskService {

  constructor(){
  }

  async create(data) {
    const newTask = await models.Task.create(data);
    return newTask;
  }

  async find() {
    const tasks = await models.Task.findAll({
      include: ['user']
    });
    return tasks;
  }

  async findOne(id) {
    const task = await models.Task.findByPk(id);
    if (!task) {
      throw boom.notFound('task not found');
    }
    return task;
  }

  async update(id, changes) {
    const task = await models.Task.findByPk(id);
    if (!task) {
      throw boom.notFound('task not found');
    }
    const rta = await task.update(changes);
    return rta;
  }

  async delete(id) {
    const task = await models.Task.findByPk(id);
    if (!task) {
      throw boom.notFound('task not found');
    }
    await task.destroy();
    return { id };
  }
}

module.exports = TaskService;
