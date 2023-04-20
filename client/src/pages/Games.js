import React, { useState } from 'react'

import useCurrentUser from '../hooks/useCurrentUser'
import gameServices from '../services/gamesService'
import { useNavigate } from 'react-router-dom'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import CreateGameForm from '../components/CreateGameForm'

const gameLobbyLabels = {
  id: 'id',
  type: 'type',
  player1: 'player1',
  player2: 'player2',
  gridSize: 'gridSize',
}

const Games = ({ onlineGames }) => {
  const [openModal, setOpenModal] = useState(false)
  const navigate = useNavigate()
  const { user } = useCurrentUser()

  const handleJoinGame = async (action) => {
    if (action.type === 'join') {
      try {
        await gameServices.join(action.gameId, user.token)
      } catch (err) {
        console.log(err)
      }
    } else if (action.type === 'start') {
      navigate(`/games/${action.gameId}`)
    }
  }
  const createNewGame = async (type = 'online') => {
    try {
      await gameServices.create({ type: type, gridSize: 4 }, user.token)
    } catch (e) {
      console.log(e)
    }
  }
  const handleCreateOnline = () => {
    createNewGame('online')
  }

  const handleCreateLocal = () => {
    navigate('/games/offline')
  }
  const handleSubmit = (game) => {
    if (game.type === 'offline') {
      console.log('offline')
    } else {
      console.log('online')
    }
  }
  return (
    <div className="">
      <Modal openModal={openModal} setOpenModal={setOpenModal}>
        <CreateGameForm handleSubmit={handleSubmit} />
      </Modal>
      <div className="flex justify-center ">
        <DataTable
          onClick={handleJoinGame}
          headers={gameLobbyLabels}
          entity={user.id}
          data={onlineGames}
        >
          <div className="w-full flex justify-between">
            <button
              onClick={() => setOpenModal(!openModal)}
              className="bg-black text-gray-400"
            >
              Create A Game
            </button>
            <button className="border" onClick={handleCreateLocal}>
              Offline Game
            </button>
            <button onClick={handleCreateOnline}>Online game</button>
          </div>
        </DataTable>
      </div>
    </div>
  )
}

export default Games
