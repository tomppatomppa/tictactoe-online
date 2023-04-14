const User = require('./user')
const Game = require('./game')
const Session = require('./session')

User.hasMany(Session)
User.hasMany(Game)

Session.belongsTo(User)

Game.sync()
User.sync()
Session.sync()

module.exports = { User, Game, Session }
