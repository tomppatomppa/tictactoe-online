const getPlayer1Moves = (gameState) => {
  return gameState.filter((coord, index) => index % 2 === 0)
}
const getPlayer2Moves = (gameState) => {
  return gameState.filter((coord, index) => index % 2 !== 0)
}
const compareCoords = (c1, c2) => {
  const [x1, y1] = c1
  const [x2, y2] = c2

  return x1 === x2 && y1 === y2
}
const isInCoordsArray = (coordArray, c2) => {
  return coordArray.some((coord) => compareCoords(coord, c2))
}
const findIndexOfCoord = (moves, coords) => {
  const [x, y] = coords
  return moves.findIndex((coord) => {
    return coord[0] === x && coord[1] === y
  })
}

function indexToCoords(index, rowLen) {
  const row = Math.floor(index / rowLen)
  const col = index % rowLen
  return [row, col]
}

function generateWinningCombinations(size) {
  const combinations = []

  // generate winning row combinations
  for (let row = 0; row < size; row++) {
    for (let col = 0; col <= size; col++) {
      const combination = []
      for (let i = 0; i < size; i++) {
        combination.push([row, col + i])
      }
      combinations.push(combination)
    }
  }

  // generate winning column combinations
  for (let col = 0; col < size; col++) {
    for (let row = 0; row <= size; row++) {
      const combination = []
      for (let i = 0; i < size; i++) {
        combination.push([row + i, col])
      }
      combinations.push(combination)
    }
  }

  // generate winning diagonal combinations
  for (let row = 0; row <= size; row++) {
    for (let col = 0; col <= size; col++) {
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
const checkGame = (gameState, inTurn) => {
  let moves = []
  if (inTurn === gameState.player2) {
    moves = getPlayer2Moves(gameState.moves)
  } else {
    moves = getPlayer1Moves(gameState.moves)
  }

  return checkWin(moves, gameState.gridSize)
}
const nextInTurn = (gameState) => {
  return gameState.inTurn === gameState.player1
    ? gameState.player2
    : gameState.player1
}

const isLastMove = (gameState) => {
  return gameState.moves.length >= gameState.gridSize ** 2
}

class Ai {
  nextMove(gameState) {
    const available = this.successors(gameState)
    const randomIndex = Math.floor(Math.random() * (available.length - 0))
    let bestMove = available[randomIndex]

    for (let i = 0; i < available.length; i++) {
      const move = available[i]
      let newState = this.makeMove(gameState, move)
      newState = this.makeMove(newState, move)
      if (checkWin(this.getPlayer1Moves(newState.moves), newState.gridSize)) {
        bestMove = move
        break
      }
      if (checkWin(this.getPlayer2Moves(newState.moves), newState.gridSize)) {
        bestMove = move
        break
      }
    }

    return bestMove
  }

  successors(gameState) {
    const { moves, gridSize } = gameState
    let successors = []
    for (let index = 0; index < gridSize * gridSize; index++) {
      const coords = indexToCoords(index, gridSize)
      if (!isInCoordsArray(moves, coords)) {
        successors.push(coords)
      }
    }

    return successors
  }

  makeMove(gameState, move) {
    const { moves } = gameState
    const newMoves = [...moves]
    newMoves.push(move)
    return { ...gameState, moves: newMoves }
  }

  getPlayer1Moves = (gameState) => {
    return gameState.filter((coord, index) => index % 2 === 0)
  }
  getPlayer2Moves = (gameState) => {
    return gameState.filter((coord, index) => index % 2 !== 0)
  }
}
export {
  generateWinningCombinations,
  getPlayer1Moves,
  getPlayer2Moves,
  compareCoords,
  isInCoordsArray,
  findIndexOfCoord,
  indexToCoords,
  checkWin,
  checkGame,
  nextInTurn,
  isLastMove,
  Ai,
}
