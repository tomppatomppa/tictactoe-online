export function Grid({ gameState, handleAction }) {
  const { moves, gridSize, isFinished } = gameState

  const gridTemplateColumns = `repeat(${gridSize}, minmax(0, 1fr))`

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
        className={`${getStyle(coords)} p-2 border border-black w-12 h-12`}
      >
        {icon}
      </button>
    )
  }

  return (
    <div
      style={{ gridTemplateColumns }}
      className={`grid grid-cols-${gridSize} gap-4 md:max-w-md ${
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

const checkGame = (gameState, inTurn) => {
  let moves = []
  if (inTurn === gameState.player2) {
    moves = getPlayer2Moves(gameState.moves)
  } else {
    moves = getPlayer1Moves(gameState.moves)
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
