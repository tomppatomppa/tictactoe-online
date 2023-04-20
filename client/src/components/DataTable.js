import React from 'react'

function hasOnlyKeyValuePairs(obj) {
  const keys = Object.keys(obj)
  const values = Object.values(obj)

  return (
    keys.every((key, index) => {
      return (
        typeof key === 'string' && key.length > 0 && values[index] !== undefined
      )
    }) && keys.length === values.length
  )
}

const DataTableItem = ({ data, onClick, entity }) => {
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
    if (tableDataItem[2] !== entity) {
      return (
        <td
          onClick={() => onClick({ type: 'join', gameId: tableDataItem[0] })}
          className="border px-4 py-2 cursor-pointer bg-blue-200"
        >
          {'Join'}
        </td>
      )
    }
    if (tableDataItem[2] === entity) {
      return (
        <td
          onClick={() => onClick('Waiting for a player to join my game')}
          className="border px-4 py-2 animate-pulse bg-red-200"
        >
          {'waiting...'}
        </td>
      )
    }
  }
  return (
    <tr data-testid="table-body-row">
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

const DataTable = ({ headers, data, entity, onClick, children }) => {
  if (!headers) {
    throw new Error('DataTable* component requires a `headers` prop.')
  }
  if (hasOnlyKeyValuePairs(headers) === false) {
    throw new Error('DataTable* `headers` prop needs to be key value pairs')
  }

  const result = data?.map((item) => {
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

  return (
    <div className="overflow-x-auto overflow-y-auto max-h-96">
      <table className="text-left">
        <thead
          data-testid="table-header"
          className="bg-black uppercase text-gray-300 divide-x-2 border-2 border-black "
        >
          <tr>
            {tableHeaders.map((header, index) => (
              <th data-testid="header-row" key={index} className="px-4 py-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody data-testid="table-body" className="border-black border-2">
          {result?.map((data, index) => (
            <DataTableItem
              onClick={onClick}
              key={index}
              data={data}
              entity={entity}
            />
          ))}
        </tbody>
      </table>
      {children}
    </div>
  )
}

export default DataTable
