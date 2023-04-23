import { prettyDOM, render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import DataTable from '../components/DataTable'
import { buttonStyleWait } from '../utils/config'

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
const templateEntity = [
  {
    target: ['header1'], //target header fields
    match: ['value1'], //match target fields
    text: 'waiting', // button text
    dispatch: ['id'], //What to include in the onClick data field
    type: 'wait', // what action to dispatch in the onClick
    style: { ...buttonStyleWait }, // button color
  },
]
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
    it('Header should not contain action label', () => {
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
    it('Action button should render', () => {
      const onClick = jest.fn()
      render(
        <DataTable
          headers={headers}
          data={data}
          onClick={onClick}
          entity={templateEntity}
        />
      )
      const actionbutton = screen.queryByTestId('action-button')

      expect(actionbutton).toBeTruthy()
    })
    it('Action button should have correct text', () => {
      const onClick = jest.fn()
      render(
        <DataTable
          headers={headers}
          data={data}
          onClick={onClick}
          entity={templateEntity}
        />
      )
      const actionbutton = screen.queryByTestId('action-button')
      console.log(prettyDOM(actionbutton))
      expect(actionbutton).toHaveTextContent('waiting')
    })
  })
})
