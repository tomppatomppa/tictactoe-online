import React from 'react'

const DataTableItem = ({ data }) => {
  const tableDataItem = Object.values(data)
  return (
    <tr>
      {tableDataItem.map((item, index) => (
        <td key={index} className="border px-4 py-2">
          {item}
        </td>
      ))}
    </tr>
  )
}

const DataTable = ({ headers, data }) => {
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
            <DataTableItem key={index} data={data} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable
