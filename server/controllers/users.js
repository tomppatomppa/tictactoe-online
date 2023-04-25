const bcrypt = require('bcrypt')
const router = require('express').Router()

const { User, Leaderboard, Game } = require('../models/index')
const { userFromToken } = require('../util/middleware')
const { Op } = require('sequelize')

router.get('/me', userFromToken, async (req, res) => {
  const games = await Game.findAll({
    where: {
      userId: req.user.id,
    },
  })
  const leaderboard = await Leaderboard.findAll({
    where: {
      userId: req.user.id,
    },
  })
  const myActiveGames = await Game.findAll({
    where: {
      [Op.or]: [{ player1: req.user.id }, { player2: req.user.id }],
      [Op.not]: [{ player2: null }],
    },
  })
  res.status(200).json({ leaderboard, myGames: games, myActiveGames })
})

router.get('/', async (req, res) => {
  const allUsers = await User.findAll()
  req.io.emit('get-all-users', 'someone fetched all users')
  res.status(200).json(allUsers)
})

router.post('/', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(401).json({ error: 'Username or Password missing' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const createdUser = await User.create({
    username: username,
    passwordHash: passwordHash,
  })

  await Leaderboard.create({ userId: createdUser.id })

  return res.status(200).json(createdUser)
})

router.delete('/me/:id', async (req, res) => {
  try {
    await Leaderboard.destroy({
      where: {
        userId: req.params.id,
      },
    })
    await Game.destroy({
      where: {
        userId: req.params.id,
      },
    })
    await User.destroy({
      where: {
        id: req.params.id,
      },
    })
    return res.status(200).json(`deleted ${req.params.id}`)
  } catch (err) {
    return res.json({ error: err })
  }
})
module.exports = router
