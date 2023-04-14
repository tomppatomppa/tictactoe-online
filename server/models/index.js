const User = require('./user')
const Game = require('./game')

User.hasMany(Game)

module.exports = { User, Game }
