import React from 'react'
import useCurrentUser from '../hooks/useCurrentUser'

const DataTableItem = ({ data, onClick }) => {
  const { user } = useCurrentUser()
  const tableDataItem = Object.values(data)

  if (onClick) {
    tableDataItem.push('action')
  }
  const ActionButton = ({ onClick, item }) => {
    if (tableDataItem[3] !== null) {
      return (
        <td
          onClick={() => onClick({ type: 'start', gameId: tableDataItem[0] })}
          className="border px-4 py-2 cursor-pointer bg-green-200"
        >
          {'Play'}
        </td>
      )
    }
    if (tableDataItem[2] !== user.id) {
      return (
        <td
          onClick={() => onClick({ type: 'join', gameId: tableDataItem[0] })}
          className="border px-4 py-2 cursor-pointer bg-blue-200"
        >
          {'Join'}
        </td>
      )
    }
    if (tableDataItem[2] === user.id) {
      return (
        <td
          onClick={() => onClick('Waiting for a player to join my game')}
          className="border px-4 py-2 cursor-pointer animate-pulse bg-red-200"
        >
          {'waiting...'}
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
    for (const key of Object.keys(headers)) {
      if (item.hasOwnProperty(key)) {
        renamedObject[headers[key]] = item[key]
      }
    }
    return renamedObject
  })
  const tableHeaders = Object.values(headers)
  if (onClick) {
    tableHeaders.push('action')
  }
  console.log(tableHeaders)
  console.log(result)
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
