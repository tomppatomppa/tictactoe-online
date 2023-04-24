const isMyGame = (game, user) => {
  const { userId } = game
  if (userId === user.id) {
    return true
  }
  return false
}

const isPlayerGame = (game, user) => {
  const { player1, player2 } = game
  if (player1 === user.id || player2 === user.id) {
    return true
  }
  return false
}

const findGame = (games, id) => {
  return games.find((game) => game.id === id)
}

export { isMyGame, isPlayerGame, findGame }
