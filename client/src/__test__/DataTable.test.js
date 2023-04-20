import {
  prettyDOM,
  render,
  screen,
  within,
  stringContaining,
} from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import DataTable from '../components/DataTable'

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
})
