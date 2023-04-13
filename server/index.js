const express = require('express')
const app = express()

const { PORT } = require('./util/config')

app.use(express.static('build'))
app.use(express.json())
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/build/index.html')
})
const start = async () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
