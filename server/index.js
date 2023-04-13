const express = require('express')
const app = express()

const { PORT } = require('./util/config')

require('dotenv').config()
const { connectToDatabase } = require('./util/database')

const usersRouter = require('./controllers/users')

app.use(express.static('build'))
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/build/index.html')
})
app.use('/api/users', usersRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
