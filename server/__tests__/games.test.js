const supertest = require('supertest')

const { app } = require('../app')
const { User, Session, Leaderboard, Game } = require('../models')
const { Op } = require('sequelize')
const config = require('./config')
const api = supertest(app)

const bcrypt = require('bcrypt')

const player1 = config.player1
const player2 = config.player2

const gameOnline = config.gameOnline

const baseUri = '/api/games'
const player1Token = '1234'
const player2Token = '4321'

describe('POST /api/users', () => {
  beforeAll(async () => {
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

    await Session.create({ token: player1Token, userId: player1.id })
    await Session.create({ token: player2Token, userId: player2.id })
  })
  afterAll(async () => {
    await Game.destroy({
      where: {
        id: gameOnline.id,
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
  })
  describe('Player1 and player2 exists in the database', () => {
    test('Player1 should exists in the database', async () => {
      const user = await User.findByPk(player1.id)
      expect(user.id).toEqual(player1.id)
    })
    test('Player2 should exists in the database', async () => {
      const user = await User.findByPk(player2.id)
      expect(user.id).toEqual(player2.id)
    })
  })
  describe('Player1 can create a game and player2 can join', () => {
    test('Player1 be able to create a game', async () => {
      const { body } = await api
        .post(baseUri)
        .send(gameOnline)
        .set('Authorization', `Bearer ${player1Token}`)
      expect(body.id).toEqual(gameOnline.id)
      expect(body.player1).toEqual(player1.id)
    })
    test('Player2 should be able to join game', async () => {
      const { body } = await api
        .put(`${baseUri}/${gameOnline.id}`)
        .set('Authorization', `Bearer ${player2Token}`)
      expect(body.player2).toEqual(player2.id)
    })
  })
  describe('Playing the game', () => {
    test('Player1 should exists in the database', async () => {
      const user = await User.findByPk(player1.id)
      expect(user.id).toEqual(player1.id)
    })
  })
})
