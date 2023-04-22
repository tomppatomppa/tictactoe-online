import {
  findIndexOfCoord,
  indexToCoords,
  isInCoordsArray,
} from '../../utils/tictactoe'

export function Grid({ gameState, handleAction }) {
  const { moves, gridSize, isFinished } = gameState

  const gridTemplateColumns = `repeat(${gridSize}, minmax(0, 1fr))`

  const getStyle = (coords) => {
    const shouldColor = isInCoordsArray(moves, coords)
    const indexOfItem = findIndexOfCoord(moves, coords)
    const style = shouldColor
      ? indexOfItem % 2 === 0
        ? 'bg-lime-600'
        : 'bg-indigo-600'
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
        className={`${getStyle(
          coords
        )} border-2 border-gray-400 hover:border-gray-300 w-16 h-16`}
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
        return <GridItem key={index} coords={coords} />
      })}
    </div>
  )
}
