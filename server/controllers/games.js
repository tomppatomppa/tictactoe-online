const router = require('express').Router()
const { Game } = require('../models/index')

router.get('/', async (req, res) => {
  const allGames = await Game.findAll()
  res.status(200).json(allGames)
})

router.post('/', async (req, res) => {
  const createdGame = await Game.create(req.body)
  res.status(200).json(createdGame)
})

module.exports = router
