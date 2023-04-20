import { checkWin } from './Game/Grid'

const nextInTurn = (gameState) => {
  return gameState.inTurn === gameState.player1
    ? gameState.player2
    : gameState.player1
}

const isLastMove = (gameState) => {
  return gameState.moves.length >= gameState.gridSize ** 2
}

function indexToCoords(index, rowLen) {
  const row = Math.floor(index / rowLen)
  const col = index % rowLen
  return [row, col]
}
const isInCoordsArray = (coordArray, c2) => {
  return coordArray.some((coord) => compareCoords(coord, c2))
}
const compareCoords = (c1, c2) => {
  const [x1, y1] = c1
  const [x2, y2] = c2

  return x1 === x2 && y1 === y2
}
//Template for Ai, currently only plays defensively and makes it so that player cannot win
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

export default Ai
export { nextInTurn, Ai, isLastMove }
