const supertest = require('supertest')

const { app } = require('../app')
const { User, Session, Leaderboard, Game } = require('../models')
const { Op } = require('sequelize')
const config = require('./config')
const api = supertest(app)

const bcrypt = require('bcrypt')

const player1 = config.player1
const player2 = config.player2
const player1Moves = config.player1Moves
const player2Moves = config.player2Moves
const player1LosingMoves = config.player1LosingMoves
const gameOnline = config.gameOnline
const gameOffline = config.gameOffline
const defaultTieMoves = config.defaultTieMoves
const baseUri = '/api/games'
const baseUriOffline = '/api/games/offline'
const player1Token = '1234'
const player2Token = '4321'

describe('POST /api/games/:id', () => {
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
    await Leaderboard.create({ userId: player1.id })
    await Leaderboard.create({ userId: player2.id })

    await Session.create({ token: player1Token, userId: player1.id })
    await Session.create({ token: player2Token, userId: player2.id })
  })

  afterAll(async () => {
    await Game.destroy({
      where: {
        [Op.or]: [{ id: gameOnline.id }, { id: gameOffline.id }],
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
    test('Player1 should win', async () => {
      for (let i = 0; i < player1Moves.length; i++) {
        // Player 1 move
        await api
          .post(`${baseUri}/${gameOnline.id}`)
          .send({ move: player1Moves[i] })
          .set('Authorization', `Bearer ${player1Token}`)
        // Player 2 move
        await api
          .post(`${baseUri}/${gameOnline.id}`)
          .send({ move: player2Moves[i] })
          .set('Authorization', `Bearer ${player2Token}`)
      }
      const gameMoves = await Game.findByPk(gameOnline.id)

      expect(gameMoves.winner).toEqual(player1.id)
    })
    test('leaderboard after game1', async () => {
      const player1LeaderBoard = await Leaderboard.findOne({
        where: {
          userId: player1.id,
        },
      })
      const player2LeaderBoard = await Leaderboard.findOne({
        where: {
          userId: player2.id,
        },
      })

      expect(player1LeaderBoard.wins).toEqual(1)
      expect(player1LeaderBoard.losses).toEqual(0)
      expect(player1LeaderBoard.ties).toEqual(0)

      expect(player2LeaderBoard.wins).toEqual(0)
      expect(player2LeaderBoard.losses).toEqual(1)
      expect(player2LeaderBoard.ties).toEqual(0)
    })

    test('Reset game state', async () => {
      await Game.update(
        { isFinished: false, moves: [], winner: null, inTurn: player1.id },
        {
          where: {
            id: gameOnline.id,
          },
        }
      )
      const game = await Game.findByPk(gameOnline.id)
      expect(game.winner).toEqual(null)
      expect(game.isFinished).toEqual(false)
      expect(game.moves.length).toEqual(0)
      expect(game.inTurn).toEqual(player1.id)
    })

    test('Player2 wins the game', async () => {
      for (let i = 0; i < player1LosingMoves.length; i++) {
        // Player 1 move
        await api
          .post(`${baseUri}/${gameOnline.id}`)
          .send({ move: player1LosingMoves[i] })
          .set('Authorization', `Bearer ${player1Token}`)
        // Player 2 move
        await api
          .post(`${baseUri}/${gameOnline.id}`)
          .send({ move: player2Moves[i] })
          .set('Authorization', `Bearer ${player2Token}`)
      }
      const gameMoves = await Game.findByPk(gameOnline.id)
      expect(gameMoves.winner).toEqual(player2.id)
    })
    test('leaderboard after game2', async () => {
      const player1LeaderBoard = await Leaderboard.findOne({
        where: {
          userId: player1.id,
        },
      })
      const player2LeaderBoard = await Leaderboard.findOne({
        where: {
          userId: player2.id,
        },
      })
      expect(player1LeaderBoard.wins).toEqual(1)
      expect(player1LeaderBoard.losses).toEqual(1)
      expect(player1LeaderBoard.ties).toEqual(0)

      expect(player2LeaderBoard.wins).toEqual(1)
      expect(player2LeaderBoard.losses).toEqual(1)
      expect(player2LeaderBoard.ties).toEqual(0)
    })
    test('Reset game state', async () => {
      await Game.update(
        { isFinished: false, moves: [], winner: null, inTurn: player1.id },
        {
          where: {
            id: gameOnline.id,
          },
        }
      )
      const game = await Game.findByPk(gameOnline.id)
      expect(game.winner).toEqual(null)
      expect(game.isFinished).toEqual(false)
      expect(game.moves.length).toEqual(0)
      expect(game.inTurn).toEqual(player1.id)
    })

    test('game ends in tie', async () => {
      //Add 14 moves that dont result in a win
      await Game.update(
        { moves: defaultTieMoves },
        {
          where: {
            id: gameOnline.id,
          },
        }
      )
      // Player 1 last move
      await api
        .post(`${baseUri}/${gameOnline.id}`)
        .send({ move: [3, 3] })
        .set('Authorization', `Bearer ${player1Token}`)
      // Player 2 last move
      await api
        .post(`${baseUri}/${gameOnline.id}`)
        .send({ move: [2, 3] })
        .set('Authorization', `Bearer ${player2Token}`)

      const game = await Game.findByPk(gameOnline.id)
      expect(game.isFinished).toEqual(true)
      expect(game.winner).toEqual(null)
    })
    test('test that leaderboard got updated', async () => {
      const player1LeaderBoard = await Leaderboard.findOne({
        where: {
          userId: player1.id,
        },
      })
      const player2LeaderBoard = await Leaderboard.findOne({
        where: {
          userId: player2.id,
        },
      })
      expect(player1LeaderBoard.wins).toEqual(1)
      expect(player1LeaderBoard.losses).toEqual(1)
      expect(player1LeaderBoard.ties).toEqual(1)

      expect(player2LeaderBoard.wins).toEqual(1)
      expect(player2LeaderBoard.losses).toEqual(1)
      expect(player2LeaderBoard.ties).toEqual(1)
    })

    test('Reset player1 leaderboard', async () => {
      const player1LeaderBoard = await Leaderboard.findOne({
        where: {
          userId: player1.id,
        },
      })
      player1LeaderBoard.wins = 0
      player1LeaderBoard.losses = 0
      player1LeaderBoard.ties = 0
      await player1LeaderBoard.save()

      expect(player1LeaderBoard.userId).toEqual(player1.id)
      expect(player1LeaderBoard.wins).toEqual(0)
      expect(player1LeaderBoard.losses).toEqual(0)
      expect(player1LeaderBoard.ties).toEqual(0)
    })
  })
})
