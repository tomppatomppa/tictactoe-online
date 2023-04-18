import React from 'react'

const myUserId = 1

const DataTableItem = ({ data, onClick }) => {
  const tableDataItem = Object.values(data)
  if (onClick) {
    tableDataItem.push('action')
  }
  const ActionButton = ({ onClick, item }) => {
    if (tableDataItem[3] !== null) {
      return (
        <td
          onClick={() => onClick('Play game')}
          className="border px-4 py-2 cursor-pointer bg-green-200"
        >
          {'Play'}
        </td>
      )
    }
    if (tableDataItem[2] !== myUserId) {
      return (
        <td
          onClick={() => onClick('Join game')}
          className="border px-4 py-2 cursor-pointer bg-blue-200"
        >
          {'Join'}
        </td>
      )
    }
    if (tableDataItem[2] === myUserId) {
      return (
        <td
          onClick={() => onClick('Waiting for a player to join my game')}
          className="border px-4 py-2 cursor-pointer animate-pulse bg-red-200"
        >
          {'waiting'}
        </td>
      )
    }
  }
  return (
    <tr>
      {tableDataItem.map((item, index) => {
        if (item === 'action') {
          return <ActionButton onClick={onClick} item={item} key={index} />
        } else {
          return (
            <td key={index} className="border px-4 py-2">
              {item}
            </td>
          )
        }
      })}
    </tr>
  )
}

const DataTable = ({ headers, data, onClick }) => {
  const result = data.map((item) => {
    const renamedObject = {}
    for (const [key, value] of Object.entries(item)) {
      if (headers.hasOwnProperty(key)) {
        renamedObject[key] = value
      }
    }
    return renamedObject
  })
  const tableHeaders = Object.values(headers)
  if (onClick) {
    tableHeaders.push('action')
  }
  return (
    <div className="overflow-x-auto">
      <table className="table-auto text-left">
        <thead>
          <tr>
            {tableHeaders.map((header, index) => (
              <th key={index} className="px-4 py-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {result?.map((data, index) => (
            <DataTableItem onClick={onClick} key={index} data={data} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable
