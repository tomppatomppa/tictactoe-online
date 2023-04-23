import { render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import { Grid } from '../components/Grid'
import userEvent from '@testing-library/user-event'
const initialGameState = {
  moves: [],
  isFinished: false,
  type: 'local',
  gridSize: 4,
  inTurn: null,
  player1: null,
  player2: 'AI',
  winner: null,
}

describe('Grid tests', () => {
  describe('Test prop validation', () => {
    it('Should throw error with no props', () => {
      expect(() => {
        render(<Grid />)
      }).toThrowError('Grid* requires a gamestate prop')
    })

    it('Should throw error with no moves field', () => {
      const { moves, ...gameState } = initialGameState
      expect(() => {
        render(<Grid gameState={gameState} />)
      }).toThrowError(
        'Invalid gameState: the "moves" property must exist and be an array.'
      )
    })

    it('Should throw error if moves is not array', () => {
      expect(() => {
        render(<Grid gameState={{ ...initialGameState, moves: 'string' }} />)
      }).toThrowError(
        'Invalid gameState: the "moves" property must exist and be an array.'
      )
    })

    it('Should throw error if isFinished property is missing', () => {
      const { isFinished, ...gameState } = initialGameState
      expect(() => {
        render(<Grid gameState={gameState} />)
      }).toThrowError(
        'Invalid gameState: the "isFinished" property must exist and be boolean type'
      )
    })

    it('Should throw error if isFinished is not a boolean', () => {
      expect(() => {
        render(
          <Grid gameState={{ ...initialGameState, isFinished: undefined }} />
        )
      }).toThrowError(
        'Invalid gameState: the "isFinished" property must exist and be boolean type'
      )
    })

    it('Should throw error if gridSize doesnt exists', () => {
      const { gridSize, ...gameState } = initialGameState
      expect(() => {
        render(<Grid gameState={gameState} />)
      }).toThrowError(
        'Invalid gameState: the "gridSize" property must exist and be integer type'
      )
    })

    it('Should throw error if gridSize is not integer', () => {
      expect(() => {
        render(<Grid gameState={{ ...initialGameState, gridSize: '10' }} />)
      }).toThrowError(
        'Invalid gameState: the "gridSize" property must exist and be integer type'
      )
    })
  })

  describe('Render with valid props', () => {
    it('should render grid body', () => {
      render(<Grid gameState={initialGameState} />)
      const gridElement = screen.getByTestId('grid-body')

      expect(gridElement).toBeTruthy()
    })

    it('should render correct number of grid items', () => {
      const excpectedGridSize = initialGameState.gridSize ** 2
      render(<Grid gameState={initialGameState} />)
      const gridElement = screen.getByTestId('grid-body')
      const gridItems = within(gridElement).getAllByTestId('grid-item')
      expect(gridItems.length).toEqual(excpectedGridSize)
    })

    it('Grid item should not have text content', () => {
      render(<Grid gameState={initialGameState} />)
      const gridElement = screen.getByTestId('grid-body')
      const gridItems = within(gridElement).getAllByTestId('grid-item')
      gridItems.forEach((cell, index) => {
        expect(cell).not.toHaveTextContent()
      })
    })

    it('First grid item should have text content "O"', () => {
      render(<Grid gameState={{ ...initialGameState, moves: [[0, 0]] }} />)
      const gridElement = screen.getByTestId('grid-body')
      const gridItems = within(gridElement).getAllByTestId('grid-item')

      expect(gridItems[0]).toHaveTextContent('O')
    })
    it('Second grid item should have text content "X"', () => {
      render(
        <Grid
          gameState={{
            ...initialGameState,
            moves: [
              [0, 0],
              [0, 1],
            ],
          }}
        />
      )
      const gridElement = screen.getByTestId('grid-body')
      const gridItems = within(gridElement).getAllByTestId('grid-item')
      expect(gridItems[1]).toHaveTextContent('X')
    })
    it('Test onClick gets clicked', () => {
      const onClick = jest.fn()
      render(<Grid gameState={initialGameState} handleAction={onClick} />)
      const gridElement = screen.getByTestId('grid-body')
      const [firstGridItem] = within(gridElement).getAllByTestId('grid-item')
      userEvent.click(firstGridItem)
      expect(onClick).toHaveBeenCalledTimes(1)
    })
    it('Occupied grid item should not fire an click event', () => {
      const onClick = jest.fn()
      render(
        <Grid
          gameState={{ ...initialGameState, moves: [[0, 0]] }}
          handleAction={onClick}
        />
      )
      const gridElement = screen.getByTestId('grid-body')
      const [firstGridItem] = within(gridElement).getAllByTestId('grid-item')
      userEvent.click(firstGridItem)
      expect(onClick).toHaveBeenCalledTimes(0)
    })
  })
})
