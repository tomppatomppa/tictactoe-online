import React, { useState } from 'react'
import useCurrentUser from '../hooks/useCurrentUser'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import CreateGameForm from '../components/CreateGameForm'

import useGame from '../hooks/useGame'
import {
  gameLobbyHeaders,
  initialLocalGameState,
  joinButton,
  playButton,
  waitButton,
} from '../utils/config'

import { useNavigate } from 'react-router-dom'
import InfoLable from '../components/InfoLable'

const Games = ({ onlineGames = [], setLocalGame }) => {
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)
  const { user } = useCurrentUser()
  const { create, actionHandler } = useGame(user)

  const handleCreateGame = (game) => {
    if (game.type !== 'online') {
      setLocalGame({
        ...initialLocalGameState,
        gridSize: game.gridSize,
        inTurn: user.id,
        player1: user.id,
      })
      navigate('/games/offline')
      return
    }
    create(game)
    setOpenModal(false)
  }

  const filteredGames = onlineGames.filter((game) => {
    if (game.player2 !== null) {
      return game.player1 === user.id || game.player2 === user.id
    }
    return true
  })

  return (
    <div className="mb-24 text-white">
      <Modal openModal={openModal} setOpenModal={setOpenModal}>
        <CreateGameForm handleSubmit={handleCreateGame} />
      </Modal>
      <div>
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setOpenModal(!openModal)}
            className="btn-primary my-6"
          >
            Create A Game
          </button>
          <button
            onClick={() => navigate('/replay')}
            className="btn-primary my-6"
          >
            Replay Mode
          </button>
        </div>
        <div className="flex justify-center">
          <DataTable
            onClick={actionHandler}
            headers={gameLobbyHeaders}
            entity={[
              { ...waitButton, match: [user.id, null] },
              { ...playButton, match: [user.id] },
              { ...playButton, target: ['player2'], match: [user.id] },
              { ...joinButton },
            ]}
            data={filteredGames}
          />
        </div>
        <div className="flex justify-center flex-col items-center">
          <label className="text-sm">What do the buttons mean?</label>
          <div className="flex flex-row">
            <InfoLable
              description="Playable game where you are either Player 1 or Player 2"
              buttonText="Play"
              color={'green'}
            />

            <InfoLable
              description="Join a game and challenge other players."
              buttonText="Join"
              color={'blue'}
            />

            <InfoLable
              description="Waiting for another player to join your game."
              buttonText="Waiting"
              color={'red'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Games
