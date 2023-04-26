const { Op } = require('sequelize')
const { User, Leaderboard, Session, Game } = require('../models')
const config = require('./config')

const bcrypt = require('bcrypt')

const player1 = config.player1
const player2 = config.player2
const gameOnline = config.gameOnline
const gameOffline = config.gameOffline
const player1Token = '1234'
const player2Token = '4321'

const initGamesTests = async () => {
  await User.destroy({
    where: {
      [Op.or]: [{ id: player1.id }, { id: player2.id }],
    },
  })

  const saltRounds = 10

  const passwordHash1 = await bcrypt.hash(player1.password, saltRounds)
  const passwordHash2 = await bcrypt.hash(player2.password, saltRounds)

  await User.create({
    id: player1.id,
    username: player1.username,
    passwordHash: passwordHash1,
  })
  await User.create({
    id: player2.id,
    username: player2.username,
    passwordHash: passwordHash2,
  })
  await Leaderboard.create({ userId: player1.id })
  await Leaderboard.create({ userId: player2.id })

  await Session.create({ token: player1Token, userId: player1.id })
  await Session.create({ token: player2Token, userId: player2.id })
}
const cleanupGamesTest = async () => {
  await Game.destroy({
    where: {
      [Op.or]: [
        { id: gameOnline.id },
        { id: gameOffline.id },
        { userId: player1.id },
      ],
    },
  })
  await Leaderboard.destroy({
    where: {
      [Op.or]: [{ userId: player1.id }, { userId: player2.id }],
    },
  })
  await Session.destroy({
    where: {
      [Op.or]: [{ userId: player1.id }, { userId: player2.id }],
    },
  })
  await User.destroy({
    where: {
      [Op.or]: [{ id: player1.id }, { id: player2.id }],
    },
  })
}

module.exports = { initGamesTests, cleanupGamesTest }
