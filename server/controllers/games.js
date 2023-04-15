const router = require('express').Router()
const { Game } = require('../models/index')
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
  res.status(200).json(createdGame)
})

module.exports = router
