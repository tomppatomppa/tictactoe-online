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

  describe('test /api/games emits', () => {
    beforeAll(async () => {
      await initGamesTests()
    })
    afterAll(async () => {
      await cleanupGamesTest()
    })
    test('Emits created game object', () => {
      return new Promise((resolve, reject) => {
        client.on('games:new-game', (game) => {
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
    test('Emits player joined a game', () => {
      return new Promise((resolve, reject) => {
        client.on('games:player-joined-game', (game) => {
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
        client.emit('games:join-room', gameOnline.id, (error) => {
          if (error) {
            done(error)
            return
          }
        })
        client.on('games:user-joined-room', (data) => {
          expect(data.message).toEqual(
            `User joined game room id ${gameOnline.id}`
          )
          resolve()
        })
      })
    })
    test('Emits updated game object to the gameroom', () => {
      client.emit('games:join-room', gameOnline.id, (error) => {
        if (error) {
          done(error)
          return
        }
        client.on('games:game-state', (game) => {
          expect(game.id).toEqual(gameOnline.id)
          expect(game.moves.length).toEqual(1)
          resolve()
        })
        //Send move to the express route
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
