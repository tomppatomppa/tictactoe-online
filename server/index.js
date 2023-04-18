const { connectToDatabase } = require('./util/database')
const { PORT } = require('./util/config')
const { httpServer } = require('./app')

const start = async () => {
  await connectToDatabase()
  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
