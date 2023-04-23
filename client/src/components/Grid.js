import {
  findIndexOfCoord,
  indexToCoords,
  isInCoordsArray,
} from '../utils/tictactoe'

const validateGridProps = (gameState) => {
  if (!gameState) {
    throw new Error('Grid* requires a gamestate prop')
  }

  if (!gameState.moves || !Array.isArray(gameState.moves)) {
    throw new Error(
      'Invalid gameState: the "moves" property must exist and be an array.'
    )
  }
  if (
    !gameState.hasOwnProperty('isFinished') ||
    typeof gameState.isFinished !== 'boolean'
  ) {
    throw new Error(
      'Invalid gameState: the "isFinished" property must exist and be boolean type'
    )
  }
  if (
    !gameState.hasOwnProperty('gridSize') ||
    !Number.isInteger(gameState.gridSize)
  ) {
    throw new Error(
      'Invalid gameState: the "gridSize" property must exist and be integer type'
    )
  }
  return true
}

export const Grid = ({ gameState, handleAction }) => {
  if (!validateGridProps(gameState)) return

  const { moves, gridSize, isFinished } = gameState

  const gridTemplateColumns = `repeat(${gridSize}, minmax(0, 1fr))`

  const GridItem = ({ coords, exists, icon, style }) => {
    const handleClick = () => {
      if (!exists) handleAction(coords)
    }
    return (
      <button
        onClick={handleClick}
        style={style}
        className={`border-2 border-gray-400 hover:border-gray-300 w-16 h-16`}
      >
        {icon}
      </button>
    )
  }
  return (
    <div
      style={{ gridTemplateColumns }}
      className={`grid grid-cols-${gridSize} gap-4 md:max-w-md  ${
        isFinished && 'pointer-events-none'
      }`}
    >
      {[...Array(gridSize ** 2)].map((_, index) => {
        const coords = indexToCoords(index, gridSize)
        const exists = isInCoordsArray(moves, coords)
        const indexOfItem = findIndexOfCoord(moves, coords) //player1 or player2
        const icon = exists ? (indexOfItem % 2 === 0 ? 'O' : 'X') : null
        const style = exists
          ? indexOfItem % 2 === 0
            ? '#c0ca33'
            : '#3949ab'
          : null

        return (
          <GridItem
            key={index}
            coords={coords}
            exists={exists}
            icon={icon}
            style={{ backgroundColor: style }}
          />
        )
      })}
    </div>
  )
}
