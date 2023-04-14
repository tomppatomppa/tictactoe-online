const bcrypt = require('bcrypt')
const router = require('express').Router()

const { User } = require('../models/index')

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

  return res.status(200).json(createdUser)
})

module.exports = router
