export function Grid({ gameState, handleAction }) {
  const { moves, gridSize, isFinished } = gameState

  const getStyle = (coords) => {
    const shouldColor = isInCoordsArray(moves, coords)
    const indexOfItem = findIndexOfCoord(moves, coords)
    const style = shouldColor
      ? indexOfItem % 2 === 0
        ? 'bg-green-200'
        : 'bg-blue-200'
      : 'bg-transparent'

    return style
  }
  const getIcon = (coords) => {
    const shouldColor = isInCoordsArray(moves, coords)
    const indexOfItem = findIndexOfCoord(moves, coords)
    const icon = shouldColor ? (indexOfItem % 2 === 0 ? 'O' : 'X') : ''

    return icon
  }
  const GridItem = ({ coords }) => {
    const icon = getIcon(coords)

    const handleClick = () => {
      if (!icon) handleAction(coords)
    }
    return (
      <button
        onClick={handleClick}
        className={`${getStyle(coords)} p-2 border w-12 h-12`}
      >
        {icon}
      </button>
    )
  }

  return (
    <div
      className={`grid grid-cols-4 gap-4 ${
        isFinished && 'pointer-events-none'
      }`}
    >
      {[...Array(gridSize ** 2)].map((_, index) => {
        const coords = indexToCoords(index, gridSize)
        return <GridItem key={index} coords={coords} />
      })}
    </div>
  )
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

const getMaximizerMoves = (gameState) => {
  return gameState.filter((coord, index) => index % 2 === 0)
}
const getMinimizerMoves = (gameState) => {
  return gameState.filter((coord, index) => index % 2 !== 0)
}

function generateWinningCombinations(size) {
  const combinations = []

  // generate winning row combinations
  for (let row = 0; row < size; row++) {
    for (let col = 0; col <= size - 4; col++) {
      const combination = []
      for (let i = 0; i < 4; i++) {
        combination.push([row, col + i])
      }
      combinations.push(combination)
    }
  }

  // generate winning column combinations
  for (let col = 0; col < size; col++) {
    for (let row = 0; row <= size - 4; row++) {
      const combination = []
      for (let i = 0; i < 4; i++) {
        combination.push([row + i, col])
      }
      combinations.push(combination)
    }
  }

  // generate winning diagonal combinations
  for (let row = 0; row <= size - 4; row++) {
    for (let col = 0; col <= size - 4; col++) {
      const combination1 = []
      const combination2 = []
      for (let i = 0; i < 4; i++) {
        combination1.push([row + i, col + i])
        combination2.push([row + i, size - col - 1 - i])
      }
      combinations.push(combination1)
      combinations.push(combination2)
    }
  }

  return combinations
}

const checkGame = (gameState, gridSize) => {
  const playerMoves = getMaximizerMoves(gameState)
  const opponentMoves = getMinimizerMoves(gameState)

  if (checkWin(playerMoves)) {
    console.log('player 1 won')
    return true
  }
  if (checkWin(opponentMoves)) {
    console.log('player 2 won')
    return true
  }
  if (gameState.length >= gridSize * gridSize) {
    console.log('draw')
    return true
  }
  return false
}

function checkWin(playerMoves, gridSize) {
  const winningCombinations = generateWinningCombinations(4)
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
export {
  compareCoords,
  isInCoordsArray,
  getMaximizerMoves,
  getMinimizerMoves,
  generateWinningCombinations,
  checkGame,
  indexToCoords,
  findIndexOfCoord,
  checkWin,
}