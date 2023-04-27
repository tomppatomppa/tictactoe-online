const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/database')

class Game extends Model {}

Game.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inTurn: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    player1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    player2: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    moves: {
      type: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.INTEGER)),
      defaultValue: [],
    },
    gridSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isFinished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    winner: {
      type: DataTypes.INTEGER,
      references: { model: 'users', key: 'id' },
    },
  },
  {
    sequelize,
    timestamps: true,
    updatedAt: true,
    modelName: 'game',
  }
)

module.exports = Game
