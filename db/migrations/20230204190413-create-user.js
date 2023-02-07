'use strict';

const { UserSchema, USER_TABLE} = require('./../models/user.modele');
const { TaskSchema, TASK_TABLE} = require('./../models/task.modele');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(TASK_TABLE, TaskSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(TASK_TABLE);
  }
};
