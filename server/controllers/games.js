const router = require('express').Router()
const { Game, User } = require('../models/index')
const { userFromToken } = require('../util/middleware')

router.get('/', async (req, res) => {
  const allGames = await Game.findAll()
  res.status(200).json(allGames)
})

router.post('/', userFromToken, async (req, res) => {
  const createdGame = await Game.create({
    ...req.body,
    userId: req.user.id,
    inTurn: req.user.id,
    player1: req.user.id,
  })
  if (req.io) {
    req.io.emit('new-created-game', createdGame)
  }
  res.status(200).json(createdGame)
})

router.put('/:id', userFromToken, async (req, res) => {
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
