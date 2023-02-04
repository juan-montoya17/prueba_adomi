const { User, UserSchema } = require('./user.modele.js');
const { Task, TaskSchema } = require('./task.modele.js');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Task.init(TaskSchema, Task.config(sequelize));
}

module.exports = setupModels;
