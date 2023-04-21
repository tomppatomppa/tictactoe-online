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
          className="btn-play "
        >
          {'Play'}
        </td>
      )
    }
    if (tableDataItem[2] !== entity) {
      return (
        <td
          onClick={() => onClick({ type: 'join', gameId: tableDataItem[0] })}
          className="btn-join"
        >
          {'Join'}
        </td>
      )
    }
    if (tableDataItem[2] === entity) {
      return (
        <td
          onClick={() => onClick('Waiting for a player to join my game')}
          className="btn-wait"
        >
          {'waiting...'}
        </td>
      )
    }
  }
  return (
    <tr
      data-testid="table-body-row "
      className="hover:bg-slate-700 translate-all duration-200 "
    >
      {tableDataItem.map((item, index) => {
        if (item === 'action') {
          return <ActionButton onClick={onClick} item={item} key={index} />
        } else {
          return (
            <td key={index} className="px-4 py-2">
              {item}
            </td>
          )
        }
      })}
    </tr>
  )
}

const DataTable = ({ headers, data, entity, onClick }) => {
  if (!headers) {
    throw new Error('DataTable* component requires a `headers` prop.')
  }
  if (hasOnlyKeyValuePairs(headers) === false) {
    throw new Error('DataTable* `headers` prop needs to be key value pairs')
  }

  let result = data?.map((item) => {
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
    <div className="overflow-x-auto overflow-y-auto max-h-[70vh] sm:text-lg text-xs text-white">
      <table className="text-left ">
        <thead
          data-testid="table-header"
          className="bg-black z-10 uppercase text-gray-300 border-2"
        >
          <tr>
            {tableHeaders.map((header, index) => (
              <th
                data-testid="header-row"
                key={index}
                className="sm:px-4 px-1 py-2"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody
          data-testid="table-body"
          className=" border-2 backdrop-blur-sm border-white"
        >
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
    </div>
  )
}

export default DataTable
