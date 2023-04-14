const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/database')

class User extends Model {
  toJSON() {
    // exclude passwordHash by default
    let attributes = Object.assign({}, this.get())
    delete attributes.passwordHash
    return attributes
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    updatedAt: true,
    modelName: 'user',
  }
)

module.exports = User
