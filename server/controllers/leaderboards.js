const router = require('express').Router()
const { Leaderboard, User } = require('../models/index')
const { Sequelize, Op } = require('sequelize')

router.get('/', async (req, res) => {
  const leaderboard = await Leaderboard.findAll({
    //Ranking by Win Loss ratio
    attributes: [
      [
        Sequelize.literal(
          'ROW_NUMBER() OVER (ORDER BY (wins * 1.0) / NULLIF(wins + losses, 0) DESC)'
        ),
        'ranking',
      ],
      'user.username',
      'wins',
      'losses',
      'ties',
      [
        Sequelize.literal(
          'CAST(ROUND(CASE WHEN (wins + losses) > 0 THEN (wins * 1.0) / (wins + losses) ELSE 0 END, 2) AS FLOAT)'
        ),
        'winLossRatio',
      ],
      [
        Sequelize.literal(
          'CAST(ROUND(CASE WHEN (wins + losses + ties) > 0 THEN (wins * 1.0) /(wins + losses + ties) ELSE 0 END, 2) AS FLOAT)'
        ),
        'winLossTieRatio',
      ],
      [Sequelize.literal('(wins + losses + ties)'), 'totalGames'],
    ],
    include: [
      {
        model: User,
        attributes: [],
      },
    ],
    where: {
      [Op.or]: [
        { wins: { [Op.gt]: 0 } },
        { losses: { [Op.gt]: 0 } },
        { ties: { [Op.gt]: 0 } },
      ],
    },
    raw: true,
  })
  res.status(200).json(leaderboard)
})

module.exports = router
