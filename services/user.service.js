const boom = require('@hapi/boom');
const faker = require('faker');

const { models } = require('./../libs/sequalize.js');

class UserService {
  constructor() {
    this.users = [];
  }

  async create(data) {
    const body = {
      id: faker.datatype.uuid(),
      ...data
    }
    const newUser = await models.User.create(body);
    return newUser;
  }

  async find() {
    return await models.User.findAll();
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
