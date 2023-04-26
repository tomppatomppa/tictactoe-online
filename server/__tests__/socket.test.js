const { app, httpServer } = require('../app')
const request = require('supertest')
const io = require('socket.io-client')
const { initGamesTests, cleanupGamesTest } = require('./setup')
const config = require('./config')

const player1 = config.player1
const player2 = config.player2
const gameOnline = config.gameOnline
const player1Token = '1234'
const player2Token = '4321'
const baseUri = '/api/games'

describe('API endpoints', () => {
  let client

  beforeAll((done) => {
    httpServer.listen(() => {
      socketUrl = `http://localhost:${httpServer.address().port}`
      client = io(socketUrl)
      client.on('connect', () => {
        done()
      })
    })
  })

  afterAll((done) => {
    if (client && client.connected) {
      client.disconnect()
    }
    httpServer.close(() => {
      done()
    })
  })

  test('should emit a "test" event on /api/games', () => {
    return new Promise((resolve, reject) => {
      client.on('test:game', (data) => {
        expect(data).toEqual('testing games')
        resolve()
      })
      request(app)
        .get(baseUri)
        .expect(200)
        .end((err) => {
          if (err) reject(err)
        })
    })
  })
  describe('test game emit', () => {
    beforeAll(async () => {
      await initGamesTests()
    })
    afterAll(async () => {
      await cleanupGamesTest()
    })

    test('Emits created game object', () => {
      return new Promise((resolve, reject) => {
        client.on('new-created-game', (game) => {
          expect(game.id).toEqual(gameOnline.id)
          expect(game.userId).toEqual(player1.id)
          resolve()
        })
        request(app)
          .post(baseUri)
          .send(gameOnline)
          .set('Authorization', `Bearer ${player1Token}`)
          .end((err) => {
            if (err) reject(err)
          })
      })
    })
    test('Emits player joined event', () => {
      return new Promise((resolve, reject) => {
        client.on('player-joined-game', (game) => {
          expect(game.player2).toEqual(player2.id)
          resolve()
        })
        request(app)
          .put(`${baseUri}/${gameOnline.id}`)
          .set('Authorization', `Bearer ${player2Token}`)
          .end((err) => {
            if (err) reject(err)
          })
      })
    })
    test('join game room', () => {
      return new Promise((resolve, reject) => {
        client.emit('join-game-room', gameOnline.id, (error) => {
          if (error) {
            done(error)
            return
          }
        })
        client.on('user-joined', (message) => {
          expect(message).toEqual(`User joined game room id ${gameOnline.id}`)
          resolve()
        })
      })
    })
    test('Emits updated game to the gameroom', () => {
      client.emit('join-game-room', gameOnline.id, (error) => {
        if (error) {
          done(error)
          return
        }
        client.on('game-state', (game) => {
          expect(game.id).toEqual(gameOnline.id)
          expect(game.moves.length).toEqual(1)
          resolve()
        })
        request(app)
          .post(`${baseUri}/${gameOnline.id}`)
          .send([0, 0])
          .set('Authorization', `Bearer ${player1Token}`)
          .end((err) => {
            if (err) reject(err)
          })
      })
    })
  })
})
