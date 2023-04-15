const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const { userFromToken } = require('../util/middleware')
const { User, Session } = require('../models/index')

router.post('/login', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    res.status(400).json({ error: 'invalid request' })
  }

  const user = await User.findOne({
    where: {
      username: username,
    },
  })

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password',
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  await Session.create({ token, userId: user.id })

  return res.status(200).send({ token, username: user.username, id: user.id })
})

router.delete('/logout', userFromToken, async (req, res) => {
  await Session.destroy({
    where: {
      userId: req.user.id,
    },
  })

  res.status(200).send({
    message: 'token revoken',
  })
})
module.exports = router
