const nextInTurn = (gameState) => {
  return gameState.inTurn === gameState.player1
    ? gameState.player2
    : gameState.player1
}

const getPlayer1Moves = (moves) => {
  return moves.filter((coord, index) => index % 2 === 0)
}
const getPlayer2Moves = (moves) => {
  return moves.filter((coord, index) => index % 2 !== 0)
}

const isLastMove = (gameState) => {
  return gameState.moves.length >= gameState.gridSize ** 2
}

function generateWinningCombinations(size) {
  const combinations = []

  // generate winning row combinations
  for (let row = 0; row < size; row++) {
    for (let col = 0; col <= size - size; col++) {
      const combination = []
      for (let i = 0; i < size; i++) {
        combination.push([row, col + i])
      }
      combinations.push(combination)
    }
  }

  // generate winning column combinations
  for (let col = 0; col < size; col++) {
    for (let row = 0; row <= size - size; row++) {
      const combination = []
      for (let i = 0; i < size; i++) {
        combination.push([row + i, col])
      }
      combinations.push(combination)
    }
  }

  // generate winning diagonal combinations
  for (let row = 0; row <= size - size; row++) {
    for (let col = 0; col <= size - size; col++) {
      const combination1 = []
      const combination2 = []
      for (let i = 0; i < size; i++) {
        combination1.push([row + i, col + i])
        combination2.push([row + i, size - col - 1 - i])
      }
      combinations.push(combination1)
      combinations.push(combination2)
    }
  }

  return combinations
}

const checkGame = (gameState, inTurn) => {
  let moves = []
  if (inTurn === gameState.player2) {
    moves = getPlayer2Moves(gameState.moves)
  } else {
    moves = getPlayer1Moves(gameState.moves)
  }

  return checkWin(moves, gameState.gridSize)
}

const checkOfflineGame = (gameState) => {
  let moves = []

  if (gameState.moves.length % 2 !== 0) {
    moves = getPlayer1Moves(gameState.moves)
  } else {
    moves = getPlayer2Moves(gameState.moves)
  }

  return checkWin(moves, gameState.gridSize)
}

function checkWin(playerMoves, gridSize) {
  const winningCombinations = generateWinningCombinations(gridSize)
  for (let combination of winningCombinations) {
    if (
      combination.every((coord) =>
        playerMoves.some((move) => move[0] === coord[0] && move[1] === coord[1])
      )
    ) {
      return true
    }
  }
  return false
}

const isInCoordsArray = (coordArray, c2) => {
  return coordArray.some((coord) => compareCoords(coord, c2))
}
const compareCoords = (c1, c2) => {
  const [x1, y1] = c1
  const [x2, y2] = c2

  return x1 === x2 && y1 === y2
}

module.exports = {
  getPlayer1Moves,
  getPlayer2Moves,
  generateWinningCombinations,
  checkGame,
  checkWin,
  nextInTurn,
  isLastMove,
  checkOfflineGame,
  isInCoordsArray,
  compareCoords,
}
