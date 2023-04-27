import { render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import DataTable from '../components/DataTable'
import { gameLobbyHeaders } from '../utils/config'
import { gameData } from './config'
const headers = {
  header1: 'header1',
  header2: 'header2',
  header3: 'header3',
  header4: 'header4',
  header5: 'header5',
}
const data = [
  {
    header1: 'value1',
    header2: 'value2',
    header3: 'value3',
    header4: 'value4',
    header5: 'value5',
  },
]

const invalidHeaders = {
  header1: 'header1',
  header2: undefined,
  header3: 'header3',
  header4: 'header4',
  header5: 'header5',
}

describe('DataTable tests', () => {
  it('should contain the headers in correct order', () => {
    render(<DataTable headers={headers} />)
    const heading = screen.getByTestId('table-header')
    const headerCells = within(heading).getAllByTestId('header-row')

    expect(headerCells.length).toEqual(Object.keys(headers).length)

    headerCells.forEach((cell, index) => {
      expect(cell).toHaveTextContent(Object.values(headers)[index])
    })
  })

  describe('Component error messages', () => {
    it('Should throw error when no header prop is passed', () => {
      expect(() => {
        render(<DataTable />)
      }).toThrowError('DataTable* component requires a `headers` prop.')
    })

    it('Should throw error with a undefined value', () => {
      expect(() => {
        render(<DataTable headers={invalidHeaders} />)
      }).toThrowError('DataTable* `headers` prop needs to be key value pairs')
    })

    it('Should not throw error with no data prop', () => {
      const { container } = render(<DataTable headers={headers} />)
      expect(container).toBeInTheDocument()
    })
  })

  it('Renders Data prop', () => {
    render(<DataTable headers={headers} data={data} />)
    const body = screen.getByTestId('table-body')
    const row = within(body).getAllByTestId('table-body-row')

    const values = Object.values(data[0])
    row.forEach((cell, index) => {
      expect(cell).toHaveTextContent(values[index])
    })
  })

  describe('Text Action button', () => {
    it('Header section should not contain action label', () => {
      render(<DataTable headers={headers} data={data} />)
      const headersItems = screen.queryByTestId('table-header')
      expect(headersItems).not.toHaveTextContent('action')
    })

    it('Header should contain action label when onClick prop is passed', () => {
      const onClick = jest.fn()
      render(<DataTable headers={headers} data={data} onClick={onClick} />)
      const headersItems = screen.queryByTestId('table-header')
      expect(headersItems).toHaveTextContent('action')
    })

    it('Action button should not render because the no player1 has id 3', () => {
      const onClick = jest.fn()
      render(
        <DataTable
          headers={gameLobbyHeaders}
          data={gameData}
          onClick={onClick}
          entity={[
            {
              target: ['player1'],
              match: [3],
              text: 'button1',
              dispatch: ['id'],
              type: 'customType',
            },
          ]}
        />
      )
      const actionbutton = screen.queryByTestId('action-button')
      expect(actionbutton).toBeFalsy()
    })

    /**
     * A Wait Button
     * A Game that is owned by the user, and doesnt have a player2:
     * We want to render a button that has text "waiting", and backgroundColor red
     */
    it('Wait button should render with two matching fields', () => {
      const onClick = jest.fn()
      const userId = 1
      render(
        <DataTable
          headers={gameLobbyHeaders}
          data={gameData}
          onClick={onClick}
          entity={[
            {
              target: ['player1', 'player2'],
              match: [userId, null],
              text: 'waiting',
              dispatch: ['id'],
              type: 'wait',
              style: { backgroundColor: 'red' },
            },
          ]}
        />
      )
      const actionbutton = screen.queryByTestId('action-button')
      expect(actionbutton).toBeTruthy()
      expect(actionbutton).toHaveTextContent('waiting')
      expect(actionbutton).toHaveStyle('background-color: red;')
    })
    /**
     * A Join Game Button
     * A Game that is not owned by the user, and doesnt have a player2:
     * We want to render a button that has text "join", and backgroundColor blue
     */
    it('Join button should render', () => {
      const onClick = jest.fn()

      render(
        <DataTable
          headers={gameLobbyHeaders}
          data={gameData}
          onClick={onClick}
          entity={[
            {
              target: ['player2'],
              match: [null],
              text: 'Join',
              dispatch: ['id'],
              type: 'join',
              style: { backgroundColor: 'blue' },
            },
          ]}
        />
      )
      const actionbutton = screen.getAllByTestId('action-button')
      expect(actionbutton).toBeTruthy()
      expect(actionbutton[0]).toHaveTextContent('Join')
      expect(actionbutton[0]).toHaveStyle('background-color: blue;')
      expect(actionbutton[1]).toHaveTextContent('Join')
      expect(actionbutton[1]).toHaveStyle('background-color: blue;')
    })
    /**
     * A Play Game Button
     * A Game that the user is player1
     * TODO: Lacks the ability to specify if player2 !== null
     * We want to render a button that has text "Play", and backgroundColor: green
     */
    it('Play button should render when user is player1', () => {
      const onClick = jest.fn()
      const userId = 1
      render(
        <DataTable
          headers={gameLobbyHeaders}
          data={gameData}
          onClick={onClick}
          entity={[
            {
              target: ['player1'],
              match: [userId],
              text: 'Play',
              dispatch: ['id'],
              type: 'play',
              style: { backgroundColor: 'green' },
            },
          ]}
        />
      )
      const actionbutton = screen.getAllByTestId('action-button')
      expect(actionbutton).toBeTruthy()
      expect(actionbutton[0]).toHaveTextContent('Play')
      expect(actionbutton[0]).toHaveStyle('background-color: green;')
    })
    /**
     * A Play Game Button
     * A Game that the user is player2
     * TODO: Lacks the ability to specify if player1 !== null
     * We want to render a button that has text "Play", and backgroundColor: green
     */
    it('Play button should render when user is player2', () => {
      const onClick = jest.fn()
      const userId = 1
      render(
        <DataTable
          headers={gameLobbyHeaders}
          data={gameData}
          onClick={onClick}
          entity={[
            {
              target: ['player2'],
              match: [userId],
              text: 'Play',
              dispatch: ['id'],
              type: 'play',
              style: { backgroundColor: 'green' },
            },
          ]}
        />
      )
      const actionbutton = screen.getAllByTestId('action-button')
      expect(actionbutton).toBeTruthy()
      expect(actionbutton[0]).toHaveTextContent('Play')
      expect(actionbutton[0]).toHaveStyle('background-color: green;')
    })
  })
})
