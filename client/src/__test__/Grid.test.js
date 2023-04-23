import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import { Grid } from '../components/Grid'

const initialLocalGameState = {
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
  it('Should throw error with no props', () => {
    expect(() => {
      render(<Grid />)
    }).toThrowError('Grid* requires a gamestate prop')
  })
  it('Should throw error with no moves field', () => {
    const { moves, ...gameState } = initialLocalGameState
    expect(() => {
      render(<Grid gameState={gameState} />)
    }).toThrowError(
      'Invalid gameState: the "moves" property must exist and be an array.'
    )
  })
  it('Should throw error if moves is not array', () => {
    expect(() => {
      render(<Grid gameState={{ ...initialLocalGameState, moves: 'string' }} />)
    }).toThrowError(
      'Invalid gameState: the "moves" property must exist and be an array.'
    )
  })
  it('Should throw error if isFinished property is missing', () => {
    const { isFinished, ...gameState } = initialLocalGameState
    expect(() => {
      render(<Grid gameState={gameState} />)
    }).toThrowError(
      'Invalid gameState: the "isFinished" property must exist and be boolean type'
    )
  })
  it('Should throw error if isFinished is not a boolean', () => {
    expect(() => {
      render(
        <Grid gameState={{ ...initialLocalGameState, isFinished: undefined }} />
      )
    }).toThrowError(
      'Invalid gameState: the "isFinished" property must exist and be boolean type'
    )
  })
  it('Should throw error if gridSize doesnt exists', () => {
    const { gridSize, ...gameState } = initialLocalGameState
    expect(() => {
      render(<Grid gameState={gameState} />)
    }).toThrowError(
      'Invalid gameState: the "gridSize" property must exist and be integer type'
    )
  })
  it('Should throw error if gridSize is not integer', () => {
    expect(() => {
      render(<Grid gameState={{ ...initialLocalGameState, gridSize: '10' }} />)
    }).toThrowError(
      'Invalid gameState: the "gridSize" property must exist and be integer type'
    )
  })
})
