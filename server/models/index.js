const User = require('./user')
const Game = require('./game')
const Session = require('./session')
const Leaderboard = require('./leaderboard')
User.hasMany(Session)
User.hasMany(Game)

Game.belongsToMany(User, { through: 'GameUser' })
User.belongsToMany(Game, { through: 'GameUser' })
// in Game model

Session.belongsTo(User)

User.sync()
Session.sync()
Game.sync()
Leaderboard.sync()

module.exports = { User, Game, Session, Leaderboard }
