const bcrypt = require('bcrypt')
const router = require('express').Router()

const { User, Leaderboard, Game, Session } = require('../models/index')
const { userFromToken } = require('../util/middleware')
const { Op } = require('sequelize')
router.get('/', async (req, res) => {
  const all = await User.findAll({})
  res.json(all)
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
      [Op.and]: [{ player2: { [Op.not]: null } }, { isFinished: false }],
    },
  })
  res.status(200).json({ leaderboard, myGames: games, myActiveGames })
})

router.delete('/me/:id', userFromToken, async (req, res) => {
  try {
    await Leaderboard.destroy({
      where: {
        userId: req.user.id,
      },
    })
    await Game.destroy({
      where: {
        userId: req.user.id,
      },
    })
    await Session.destroy({
      where: {
        userId: req.user.id,
      },
    })
    await User.destroy({
      where: {
        id: req.user.id,
      },
    })
    return res.status(200).json(`Deleted user ${req.params.id}`)
  } catch (err) {
    console.log(err)
    return res.status(400).json({ error: err })
  }
})

module.exports = router
