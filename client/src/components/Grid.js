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

  const GridItem = ({ coords, exists, icon, style }) => {
    const handleClick = () => {
      if (!exists) handleAction(coords)
    }
    return (
      <button
        data-testid="grid-item"
        onClick={handleClick}
        style={style}
        className={`border-2 border-gray-400 hover:border-gray-300 w-12 h-12 sm:w-16 sm:h-16`}
      >
        {icon}
      </button>
    )
  }

  return (
    <div
      data-testid="grid-body"
      style={{
        gridTemplateColumns: `repeat(${gridSize}, minmax(auto, 0))`,
      }}
      className={`overflow-auto h-[400px] md:h-[auto] w-full justify-center grid ${
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
