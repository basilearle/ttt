export type BoardCell = 'x' | 'o' | null

export type Board = Array<BoardCell>

export function createBoard(): Board {
  return new Array(9).fill(null)
}

export function updateBoard(
  board: Board,
  index: number,
  value: BoardCell,
): Board {
  board[index] = value

  // ensure to copy the array, as modifying by reference causes issues with React state
  return Array.from(board)
}

export function checkForWinner(b: Board) {
  return ([0, 1, 2]
    .some(i => (
        b[i] &&
        b[i] === b[i + 3] &&
        b[i] === b[i + 6]
      ) || (
        b[3 * i] &&
        b[3 * i] === b[3 * i + 1] &&
        b[3 * i] === b[3 * i + 2]
      ) || (
        b[0] &&
        b[0] === b[4] &&
        b[0] === b[8]
      ) || (
        b[2] &&
        b[2] === b[4] &&
        b[2] === b[6]
      )
    )
  )
}
