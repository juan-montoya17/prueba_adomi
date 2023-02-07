const { Model, DataTypes} = require('sequelize');

const { USER_TABLE } = require('./user.modele.js');

const TASK_TABLE = 'tasks';

const TaskSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
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
  },
  userId: {
    field: "user",
    allowNull: false,
    type: DataTypes.UUID,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'Set Null'
  }
}

class Task extends Model {
  static  associate(models){
    //association tasks to users many to one
    this.belongsTo(models.User, {as: 'user'});
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
