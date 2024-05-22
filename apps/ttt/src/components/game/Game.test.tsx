import { render } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import Game from './Game'
import { describe } from 'vitest';

const WINNING_SEQUENCES = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal from top-left to bottom-right
  [2, 4, 6]  // diagonal from top-right to bottom-left
]

const generateRandomMove = (exclusions: number[] = []) => {
  let randomNumber

  do {
    randomNumber = Math.floor(Math.random() * 9)
  } while (exclusions.includes(randomNumber))

  return randomNumber
}

describe('<Game />', async () => {
  const { findAllByRole, findByText, getByRole } = render(
    <Game />
  )

  const cellButtons=
    await findAllByRole('button') as HTMLButtonElement[]

  describe('stalemate happy path', () => {
    it('should sequentially play "x" and "o" until the board is filled', async () => {
      const stalemateOrder = [4, 0, 2, 6, 3, 1, 7, 5, 8]

      for (let i = 0; i < stalemateOrder.length; i++) {
        const btn = cellButtons[stalemateOrder[i]]

        await userEvent.click(btn)

        const expectedMove = i % 2 === 0 ? 'x' : 'o'

        expect(btn.textContent).toBe(expectedMove)
      }
    })

    it('should reset the game when the "play again" button is clicked', async () => {
      const playAgainBtn = getByRole('button', {
        name: /reset-board/i
      })


      await userEvent.click(playAgainBtn)

      expect(cellButtons.every((btn) => !btn.disabled)).toBeTruthy()
    })
  })

  it.each(WINNING_SEQUENCES)('playing the sequence %i, %i, %i should result in a win', async (...winningSequence) => {
    const usedRandomMoves: number[] = []

    for (const move of winningSequence) {
      await userEvent.click(cellButtons[move])

      const playTwoMove= generateRandomMove([
        ...usedRandomMoves,
        ...winningSequence,
      ])

      usedRandomMoves.push(move)

      await userEvent.click(cellButtons[playTwoMove])
    }

    const playAgainBtn = await findByText(/play\sagain\?/g)

    await userEvent.click(playAgainBtn)
  })
})
