const User = require('./user')
const Game = require('./game')
const Session = require('./session')

User.hasMany(Session)
User.hasMany(Game)

Session.belongsTo(User)

User.sync()
Session.sync()
Game.sync()

module.exports = { User, Game, Session }
