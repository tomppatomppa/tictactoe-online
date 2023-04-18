const supertest = require('supertest')

const { app } = require('../app')
const { User, Session, Leaderboard, Game } = require('../models')
const { Op } = require('sequelize')
const config = require('./config')
const api = supertest(app)

const bcrypt = require('bcrypt')

const player1 = config.player1
const defaultLeaderboardScore = config.defaultLeaderboardScore
const baseUri = '/api/leaderboards'
const player1Token = '1234'

describe('/api/leaderboards', () => {
  beforeAll(async () => {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(player1.password, saltRounds)

    await User.create({
      id: player1.id,
      username: player1.username,
      passwordHash: passwordHash,
    })
    await Leaderboard.create({
      userId: player1.id,
      ...defaultLeaderboardScore,
    })
    await Session.create({ token: player1Token, userId: player1.id })
  })
  afterAll(async () => {
    await Leaderboard.destroy({
      where: {
        [Op.or]: [{ userId: player1.id }],
      },
    })
    await Session.destroy({
      where: {
        [Op.or]: [{ userId: player1.id }],
      },
    })
    await User.destroy({
      where: {
        [Op.or]: [{ id: player1.id }],
      },
    })
  })
  describe('add a leader board with wins, losses and ties', () => {
    test('Leaderboard exists', async () => {
      const result = await Leaderboard.findOne({
        where: {
          userId: player1.id,
        },
      })
      expect(result.wins).toEqual(defaultLeaderboardScore.wins)
      expect(result.losses).toEqual(defaultLeaderboardScore.losses)
      expect(result.ties).toEqual(defaultLeaderboardScore.ties)
    })
  })
  describe('/api/leaderboards', () => {
    test('endpoint should calculate win/loss/tie ratio', async () => {
      const { body } = await api.get(baseUri)
      const player1leaderboard = body.find(
        (item) => item.user.username === player1.username
      )

      expect(player1leaderboard).toBeDefined()
      expect(player1leaderboard.winLossRatio).toEqual(0.5)
      expect(player1leaderboard.winLossTieRatio).toEqual(0.43)
      expect(player1leaderboard.wins).toEqual(defaultLeaderboardScore.wins)
      expect(player1leaderboard.losses).toEqual(defaultLeaderboardScore.losses)
      expect(player1leaderboard.ties).toEqual(defaultLeaderboardScore.ties)
    })
  })
})
