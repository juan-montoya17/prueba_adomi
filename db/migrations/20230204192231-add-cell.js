'use strict';

const { UserSchema, USER_TABLE} = require('./../models/user.modele');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(USER_TABLE, 'cell', UserSchema.cell);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(USER_TABLE, 'cell');
  }
};
