const faker = require("faker");
const boom = require("@hapi/boom");

const { models } = require('./../libs/sequalize.js');

class TaskService {

  constructor(){
    this.tasks = [];
    this.generate();
  }

  generate() {
    const limit = 10;
    for(let index = 0; index < limit; index++){
      this.tasks.push({
        id: faker.datatype.uuid(),
        title: faker.name.jobTitle(),
        description: faker.commerce.productDescription(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }
  create(data) {
    const newTask = {
      id: faker.datatype.uuid(),
      ...data,
      isBlock: faker.datatype.boolean(),
    }
    this.tasks.push(newTask);
    return newTask;
  }

  async find() {
    return await models.Task.findAll();
  }

  async findOne(id) {
    const task = this.tasks.find(item => item.id === id);
    if(!task){
      throw boom.notFound('Task not found')
    }
    if (task.isBlock) {
      throw boom.conflict('Task is block')
    }
    return task;
  }

  async update(id, changes) {
    const index = this.tasks.findIndex(item => item.id === id);
    if (index === -1) {
      throw  boom.notFound('Task not found');
    }
    const task = this.tasks[index];
    this.tasks[index] = {
      ...task,
      ...changes
    };
    return this.tasks[index];
  }

  async delete(id) {
    const index = this.tasks.findIndex(item => item.id === id);
    if (index === -1) {
      throw  boom.notFound('Task not found');
    }
    this.tasks.splice(index, 1);
    return{ id };
  }
}

module.exports = TaskService;
