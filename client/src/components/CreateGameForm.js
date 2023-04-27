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
    <div className="mt-12 p-2 bg-black border-2 border-white text-white shadow-md">
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center gap-4 p-2"
      >
        <strong>GAME TYPE</strong>
        <div className="flex justify-between gap-4">
          <label
            id="select-online-button"
            className={`${
              type === 'online' ? 'bg-green-500' : ''
            } border btn-type w-24`}
            onClick={() => setType('online')}
          >
            Online
          </label>
          <label
            id="select-offline-button"
            className={`${
              type === 'local' ? 'bg-green-500' : ''
            } border btn-type w-24`}
            onClick={() => setType('local')}
          >
            Local
          </label>
        </div>
        <div className="flex flex-col self-start w-full">
          <label>GRID SIZE (3-10) </label>
          <input
            className="input"
            min={3}
            max={10}
            type="number"
            value={gridSize || ''}
            onChange={handleGridChange}
            aria-label="grid-size-input"
          />
        </div>
        <button className={`btn-primary self-end`} type="submit">
          Create
        </button>
      </form>
    </div>
  )
}

export default CreateGameForm
