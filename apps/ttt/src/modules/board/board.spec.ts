import { checkForWinner, createBoard, updateBoard } from './board'

describe('board', () => {
  describe('createBoard', () => {
    const board = createBoard()

    it('should have 9 entries', () => {
      expect(board).length(9)
    })

    it('have only null values', () => {
      expect(board.every(c => c === null))
    })
  })

  describe('updateBoard', () => {
    const board = createBoard()

    let updatedBoard = board

    const countFilledCells = () => updatedBoard.filter(cell => !!cell).length

    it('should have one cell selected', () => {
      updatedBoard = updateBoard(board, 0, 'x')

      expect(countFilledCells()).toBe(1)
    })

    it('should have two cell selected', () => {
      updatedBoard = updateBoard(board, 3, 'o')

      expect(countFilledCells()).toBe(2)
    })
  })

  describe('checkForWinner', () => {
    const board = createBoard()

    it('should not have a winner', () => {
      expect(checkForWinner(board)).toBeFalsy()
    })

    // top row horizontal win
    const winningBoard = [0, 1, 2]
      .reduce((b, cell) => updateBoard(b, cell, 'x'), board)

    it('should have a winner', () => {
      expect(winningBoard).toBeTruthy()
    })
  })
})
