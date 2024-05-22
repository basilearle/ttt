import { StyledBoard } from './Board.styled'
import type { Board } from '../../modules/board/board'

export type BoardProps = {
  cells: Board
  handleSelection: (index: number) => void
  disabled: boolean
}

export function Board({ cells, disabled, handleSelection }: BoardProps) {
  return (
    <StyledBoard disabled={disabled}>
      { cells.map((cell, i) => (
        <button
          key={i}
          disabled={!!cell}
          onClick={() => handleSelection(i)}>
          {cell}
        </button>
      )) }
    </StyledBoard>
  )
}

export default Board
