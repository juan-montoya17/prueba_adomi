'use strict';

const { TaskSchema, TASK_TABLE} = require('../models/task.modele')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(TASK_TABLE, 'user', TaskSchema.userId);
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(TASK_TABLE, 'user');
  }
};
