const router = require('express').Router()

const { Game } = require('../models/index')

router.get('/', async (req, res) => {
  const allGames = await Game.findAll()
  res.status(200).json(allGames)
})

module.exports = router
