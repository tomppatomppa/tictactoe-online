const router = require('express').Router()

const { Game, User, Leaderboard } = require('../models/index')
const { Op, Sequelize, fn } = require('sequelize')

router.get('/', async (req, res) => {
  const leaderboard = await Leaderboard.findAll({
    attributes: [
      'userId',
      [Sequelize.literal('COALESCE(wins, 0)'), 'wins'],
      [Sequelize.literal('COALESCE(losses, 0)'), 'losses'],
      [Sequelize.literal('COALESCE(ties, 0)'), 'ties'],
      [
        Sequelize.literal(
          'CAST(ROUND(CASE WHEN (wins + losses) > 0 THEN (wins * 1.0) / (wins + losses) ELSE 0 END, 2) AS FLOAT)'
        ),
        'winLossRatio',
      ],
      [
        Sequelize.literal(
          'CAST(ROUND(CASE WHEN (wins + losses + ties) > 0 THEN (wins * 1.0) / (wins + losses + ties) ELSE 0 END, 2) AS FLOAT)'
        ),
        'winLossTieRatio',
      ],
      [Sequelize.literal('(wins + losses + ties)'), 'totalGames'],
    ],
  })
  res.status(200).json(leaderboard)
})

module.exports = router
