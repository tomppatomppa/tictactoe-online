import React, { useState } from 'react'

const CreateGameForm = ({ handleSubmit }) => {
  const [type, setType] = useState('local')
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
          <label
            className={`${
              type === 'online' ? 'border-blue-200' : 'border'
            } border p-1 w-24`}
            onClick={() => setType('online')}
          >
            Online
          </label>
          <label
            className={`${
              type === 'local' ? 'border-blue-200' : 'border'
            } border p-1 w-24`}
            onClick={() => setType('local')}
          >
            Local
          </label>
        </div>
        <div className="flex flex-col self-start w-full">
          <label>Grid Size (3-10) </label>
          <input
            min={3}
            max={10}
            type="number"
            value={gridSize}
            onChange={handleGridChange}
          />
        </div>
        <button className={`self-end border p-1 w-24`} type="submit">
          Create
        </button>
      </form>
    </div>
  )
}

export default CreateGameForm
