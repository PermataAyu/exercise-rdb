const {Model, DataTypes} = require('sequelize')
const {sequelize} = require('../utils/db')

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true
    },
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  underscored: true,
  modelName: 'user'
})

module.exports = User