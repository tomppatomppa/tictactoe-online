import { render, screen, within } from '@testing-library/react'
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
  it('Should preserve order of the headers', () => {
    render(<DataTable headers={headers} />)
    const heading = screen.getByTestId('table-header')
    const headerCells = within(heading).getAllByTestId('header-row')

    headerCells.forEach((cell, index) => {
      expect(cell).toHaveTextContent(Object.values(headers)[index])
    })
  })
})
