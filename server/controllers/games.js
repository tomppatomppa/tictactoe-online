const router = require('express').Router()
const { Sequelize, Op } = require('sequelize')
const { checkGame, nextInTurn, isLastMove } = require('../games/tic-tac-toe')
const { Game, Leaderboard, User } = require('../models/index')
const { userFromToken, validateMoveMiddleware } = require('../util/middleware')

router.get('/', async (req, res) => {
  const allGames = await Game.findAll({
    where: {
      isFinished: false,
    },

    raw: true,
  })

  res.status(200).json(allGames)
})

router.use(userFromToken)

const addOfflineToLeaderboard = async (game) => {
  const { player1, winner } = game

  if (winner !== null) {
    await Leaderboard.update(
      { wins: Sequelize.literal('wins + 1') },
      {
        where: { userId: winner === player1 ? player1 : null },
      }
    )
    await Leaderboard.update(
      { losses: Sequelize.literal('losses + 1') },
      {
        where: { userId: winner === player1 ? null : player1 },
      }
    )
  } else {
    await Leaderboard.update(
      { ties: Sequelize.literal('ties + 1') },
      {
        where: {
          userId: player1,
        },
      }
    )
  }
}

const addToLeaderboard = async (game) => {
  const { player1, player2, winner } = game

  if (winner !== null) {
    await Leaderboard.update(
      { wins: Sequelize.literal('wins + 1') },
      {
        where: { userId: winner },
      }
    )
    await Leaderboard.update(
      { losses: Sequelize.literal('losses + 1') },
      {
        where: { userId: winner === player1 ? player2 : player1 },
      }
    )
  } else {
    await Leaderboard.update(
      { ties: Sequelize.literal('ties + 1') },
      {
        where: {
          [Op.or]: [{ userId: player1 }, { userId: player2 }],
        },
      }
    )
  }
}

router.post('/', async (req, res) => {
  const { id } = req.user
  const createdGame = await Game.create({
    ...req.body,
    userId: id,
    inTurn: id,
    player1: id,
    player2: null,
  })
  if (req.io) {
    req.io.emit('new-created-game', createdGame)
  }
  res.status(200).json(createdGame)
})

//TODO: When when user starts an offline game,
//Save an empty in the database, and when the game ends in the frontend
router.post('/offline', async (req, res) => {
  if (req.user.id !== req.body.player1) {
    return res.status(401).json({ error: 'Unauthorized game save' })
  }
  //remove "AI" from the request
  const game = req.body
  await addOfflineToLeaderboard(game)
  const { player1, player2, inTurn, winner } = game

  //Remove "AI" from the game
  const savedGame = await Game.create({
    ...game,
    player2: null,
    winner: winner === player1 ? player1 : null,
    inTurn: inTurn === player1 ? player1 : null,
  })

  await Leaderboard.findOne({
    where: {
      userId: req.user.id,
    },
  })
  res.status(200).json(savedGame)
})

router.post('/:id', validateMoveMiddleware, async (req, res) => {
  let { game } = req

  game.moves = game.moves.concat([req.body.move])

  if (isLastMove(game)) {
    game.isFinished = true
  }

  if (checkGame(game, game.inTurn)) {
    game.isFinished = true
    game.winner = game.inTurn
  } else {
    game.inTurn = nextInTurn(game)
  }

  try {
    const savedGame = await game.save()
    if (game.isFinished) {
      await addToLeaderboard(game)
    }
    if (req.io) {
      req.io.to(game.id.toString()).emit('game-state', savedGame)
    }
    res.status(200).json(savedGame)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Unable to save game' })
  }
})

router.put('/:id', async (req, res) => {
  const result = await Game.update(
    {
      player2: req.user.id,
    },
    {
      where: {
        id: req.params.id,
        player2: null,
      },
      returning: true,
    }
  )
  if (result[0] === 0) {
    return res.status(400).json({ error: 'Game is full' })
  }
  const updatedGame = result[1][0]

  if (req.io) {
    req.io.emit('player-joined-game', updatedGame)
  }

  res.status(200).json(updatedGame)
})

router.delete('/:id', async (req, res) => {
  const game = await Game.findByPk(req.params.id)

  if (!game) {
    return res.status(404).json({ error: 'Game not found' })
  }

  if (game.userId !== req.user.id || game.player2 !== null) {
    return res.status(401).json({ error: 'Unauthorized delete' })
  }

  await game.destroy()

  if (req.io) {
    req.io.emit('delete:game', game)
  }

  return res.status(200).json(`Deleted game ${req.params.id}`)
})

module.exports = router
