import React, { useState } from 'react'

const CreateGameForm = ({ handleSubmit }) => {
  const [type, setType] = useState('offline')
  const [gridSize, setGridSize] = useState(4)

  const handleGridChange = (event) => {
    setGridSize(parseInt(event.target.value))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const gameObject = {
      type,
      gridSize,
    }
    handleSubmit(gameObject)
  }
  return (
    <div>
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center gap-4 p-2"
      >
        <label className="">Game Type</label>
        <div className="flex justify-between gap-4">
          <button
            className={`${
              type === 'online' ? 'border-blue-200' : 'border'
            } border rounded-md p-1`}
            onClick={() => setType('online')}
          >
            Online
          </button>
          <button
            className={`${
              type === 'offline' ? 'border-blue-200' : 'border'
            } border rounded-md p-1`}
            onClick={() => setType('offline')}
          >
            Offline
          </button>
        </div>
        <div className="flex flex-col">
          <label>Grid Size (3-10) </label>
          <input
            min={3}
            max={10}
            type="number"
            value={gridSize}
            onChange={handleGridChange}
          />
        </div>
        <button className={` border rounded-md p-1`} type="submit">
          Create
        </button>
      </form>
    </div>
  )
}

export default CreateGameForm
