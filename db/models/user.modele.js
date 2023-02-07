const { Model, DataTypes} = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  cell: {
    allowNull: true,
    type: DataTypes.STRING,
    unique: false
  }
}

class User extends Model {
  static  associate(models){
    //associations can be defined here
    this.hasMany(models.Task, {
      as: 'tasks',
      foreignKey: 'userId'
    });
    }

  static config(sequelize){
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}

module.exports = { UserSchema, User, USER_TABLE }
