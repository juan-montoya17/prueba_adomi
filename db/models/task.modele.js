const { Model, DataTypes} = require('sequelize');

const TASK_TABLE = 'tasks';

const TaskSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: false
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: false
  },
  date: {
    allowNull: false,
    type: DataTypes.DATE,
    unique: false
  }
}

class Task extends Model {
  static  associate(){
    //associations can be defined here
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: TASK_TABLE,
      modelName: 'Task',
      timestamps: false
    }
  }
}

module.exports = { TaskSchema, Task, TASK_TABLE }
