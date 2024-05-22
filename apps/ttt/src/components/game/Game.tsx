import {useCallback, useMemo, useState} from 'react'

import {StyledGameLayout} from './Game.styled'
import {Board} from '../board/Board'
import {checkForWinner} from '../../modules/board/board'
import {createBoard, updateBoard} from '../../modules/board/board'

export function Game() {
  const [ board, setBoard, ] = useState(createBoard())

  const handleBoardSelection = useCallback((index: number) => {
    const numberOfMoves = board.filter(c => c !== null).length
    // assuming here that `x` will always play first
    const whosPlay =
      numberOfMoves === 0 || numberOfMoves % 2 === 0 ?
        'x' : 'o'

    setBoard(updateBoard(board, index, whosPlay))
  }, [ board ])

  const [ winner, fullBoard] = useMemo(
    () => [
      checkForWinner(board),
      board.every(c => !!c),
    ],
    [ board ]
  )

  const noMoreMoves = winner || fullBoard

  return (
    <StyledGameLayout>
      <main>
        <Board
          cells={board}
          handleSelection={handleBoardSelection}
          disabled={noMoreMoves}
        />
        { noMoreMoves &&
          <button
            name="reset-board"
            onClick={() => setBoard(createBoard())}>
            reset-board
          </button>
        }
      </main>
    </StyledGameLayout>
  )
}

export default Game
