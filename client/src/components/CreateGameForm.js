import React from 'react'

const CreateGameForm = ({ onSubmit }) => {
  return (
    <div>
      <form onSubmit={() => console.log('submit form')}>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default CreateGameForm
