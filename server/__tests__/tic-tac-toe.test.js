const {
  nextInTurn,
  getPlayer1Moves,
  getPlayer2Moves,
  isLastMove,
  generateWinningCombinations,
  checkWin,
  isInCoordsArray,
  compareCoords,
} = require('../games/tic-tac-toe')

const gameState = {
  inTurn: 'player1',
  player1: 'player1',
  player2: 'player2',
  gridSize: 4,
  moves: [
    [0, 0],
    [1, 1],
    [0, 0],
    [1, 1],
    [0, 0],
  ],
}

describe('Tic-tac-toe helper functions', () => {
  test('nextInTurn returns player who is not in turn', () => {
    expect(nextInTurn(gameState)).toBe('player2')
  })
  describe('getPlayer1Moves && getPlayer2Moves', () => {
    test('getPlayer1Moves returns only player1 moves', () => {
      expect(getPlayer1Moves(gameState.moves)).toStrictEqual([
        [0, 0],
        [0, 0],
        [0, 0],
      ])
    })
    test('getPlayer2Moves returns only player2 moves', () => {
      expect(getPlayer2Moves(gameState.moves)).toStrictEqual([
        [1, 1],
        [1, 1],
      ])
    })
  })
  describe('isLastMove', () => {
    test('isLastMove should return false', () => {
      expect(isLastMove(gameState)).toEqual(false)
    })
    test('isLastMove should return true', () => {
      const moves = gameState.moves.concat(
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0]
      )
      expect(isLastMove({ ...gameState, moves })).toEqual(true)
    })
  })
  describe('generateWinningCombinations', () => {
    test('returns correct number of winning combinations', () => {
      const gridSize = 3
      const result = generateWinningCombinations(gridSize)
      expect(result.length).toBe(gridSize * 2 + 2)
    })
    test('returns correct number of winning combinations', () => {
      const gridSize = 4
      const result = generateWinningCombinations(gridSize)
      expect(result.length).toBe(gridSize * 2 + 2)
    })
    test('returns correct number of winning combinations', () => {
      const gridSize = 10
      const result = generateWinningCombinations(gridSize)
      expect(result.length).toBe(gridSize * 2 + 2)
    })
  })
  describe('checkWin', () => {
    test('should return false', () => {
      const gridSize = 3
      const nonWinningMoves = [
        [0, 0],
        [0, 2],
      ]
      expect(checkWin(nonWinningMoves, gridSize)).toBe(false)
    })
    test('should return true', () => {
      const gridSize = 3
      const winningMoves = [
        [2, 0],
        [2, 1],
        [2, 2],
      ]
      expect(checkWin(winningMoves, gridSize)).toBe(true)
    })
  })
  describe('checkWin', () => {
    test('Coord doesnt exists in the array, should return false', () => {
      const arrayOfCoords = [
        [0, 2],
        [2, 2],
        [1, 3],
      ]
      expect(isInCoordsArray(arrayOfCoords, [0, 1])).toBe(false)
    })
    test('Coord exists in the array, function should return true', () => {
      const arrayOfCoords = [
        [0, 2],
        [2, 2],
        [1, 3],
      ]
      expect(isInCoordsArray(arrayOfCoords, [1, 3])).toBe(true)
    })
  })
  describe('CompareCoords', () => {
    test('Coords are not equal', () => {
      expect(compareCoords([0, 0], [1, 2])).toBe(false)
    })
    test('Coords are equal', () => {
      expect(compareCoords([1, 2], [1, 2])).toBe(true)
    })
  })
})
