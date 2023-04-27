import {
  fireEvent,
  getByRole,
  prettyDOM,
  render,
  screen,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import React from 'react'
import CreateGameForm from '../components/CreateGameForm'

describe('OnSubmit get called', () => {
  test('Submit button gets called', () => {
    const handleSubmit = jest.fn()
    render(<CreateGameForm handleSubmit={handleSubmit} />)
    const submitButton = screen.getByRole('button', { type: 'submit' })
    userEvent.click(submitButton)
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })

  test('OnSubmit sends correct data for offline game', () => {
    const handleSubmit = jest.fn()
    render(<CreateGameForm handleSubmit={handleSubmit} />)

    userEvent.clear(screen.getByLabelText('grid-size-input'), 0)
    userEvent.type(screen.getByLabelText('grid-size-input'), '3')

    const submitButton = screen.getByRole('button', { type: 'Submit' })
    fireEvent.click(submitButton)

    expect(handleSubmit).toHaveBeenCalledWith({ gridSize: 3, type: 'local' })
  })

  test('OnSubmit sends correct data for online game', () => {
    const handleSubmit = jest.fn()
    render(<CreateGameForm handleSubmit={handleSubmit} />)

    userEvent.clear(screen.getByLabelText('grid-size-input'), 0)
    userEvent.type(screen.getByLabelText('grid-size-input'), '10')
    userEvent.click(screen.getByText('Online'))

    const submitButton = screen.getByRole('button', { type: 'Submit' })
    fireEvent.click(submitButton)

    expect(handleSubmit).toHaveBeenCalledWith({ gridSize: 10, type: 'online' })
  })
})
