import { useState } from 'react'

const useReplay = () => {
  const [originalMoves, setOriginalMoves] = useState(null)
  const [game, setGame] = useState(null)
  const [index, setIndex] = useState(0)

  const handleSetGame = (game) => {
    if (game === null) {
      setGame(null)
      setOriginalMoves(null)
      setIndex(0)
      return
    }
    setOriginalMoves(game.moves)
    setGame({
      ...game,
      moves: [],
    })
  }
  const advance = () => {
    if (index >= originalMoves.length) return
    setIndex(index + 1)
    const moves = originalMoves.slice(0, index + 1)

    setGame({
      ...game,
      moves: moves,
    })
  }

  const back = () => {
    if (index <= 0) return
    setIndex(index - 1)
    const moves = originalMoves.slice(0, index - 1)

    setGame({
      ...game,
      moves: moves,
    })
  }

  return { game, handleSetGame, advance, back }
}

export default useReplay
