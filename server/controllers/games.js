const router = require('express').Router()
const { checkGame, nextInTurn, isLastMove } = require('../games/tic-tac-toe')
const { Game, Leaderboard } = require('../models/index')
const { userFromToken, validateMoveMiddleware } = require('../util/middleware')

router.get('/', async (req, res) => {
  const allGames = await Game.findAll()
  res.status(200).json(allGames)
})

router.use(userFromToken)

router.post('/', async (req, res) => {
  const { id } = req.user
  const createdGame = await Game.create({
    ...req.body,
    userId: id,
    inTurn: id,
    player1: id,
    player2: req.body.type === 'online' ? null : id,
  })
  if (req.io) {
    req.io.emit('new-created-game', createdGame)
  }
  res.status(200).json(createdGame)
})

const addToLeaderboard = async (game) => {
  const { player1, player2, winner } = game

  if (!winner) {
    await Leaderboard.update(
      { wins: sequelize.literal('ties + 1') },
      {
        where: { userId: player1 },
      }
    )
    await Leaderboard.update(
      { wins: sequelize.literal('ties + 1') },
      {
        where: { userId: player2 },
      }
    )
  } else {
    const losingPlayer = winner === player1 ? player1 : player2
    await Leaderboard.update(
      { wins: sequelize.literal('wins + 1') },
      {
        where: { userId: winner },
      }
    )
    await Leaderboard.update(
      { wins: sequelize.literal('losses + 1') },
      {
        where: { userId: losingPlayer },
      }
    )
  }
}
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
router.delete('/', async (req, res) => {
  await Game.destroy({
    where: {},
  })
  return res.status(200).json('Deleted all games')
})
module.exports = router
