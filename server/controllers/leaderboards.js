const router = require('express').Router()

const { Game, User, Leaderboard } = require('../models/index')
const { Op, Sequelize, fn } = require('sequelize')

router.get('/', async (req, res) => {
  console.log(req.io)
  const all = await Leaderboard.findAll()
  res.status(200).json(all)
})

module.exports = router
