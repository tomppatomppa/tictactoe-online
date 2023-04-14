const router = require('express').Router()
const { User } = require('../models/index')

router.get('/', async (req, res) => {
  const allUsers = await User.findAll()
  req.io.emit('get-all-users', 'someone fetched all users')
  res.status(200).json(allUsers)
})

router.post('/', async (req, res) => {
  const createdUser = await User.create(req.body)

  return res.status(200).json(createdUser)
})

module.exports = router
