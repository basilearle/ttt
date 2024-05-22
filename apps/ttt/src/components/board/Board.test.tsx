import { render, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import { Board } from './Board'
import { createBoard } from '../../modules/board/board'

describe('<Board />', async () => {
  const boardCells = createBoard()
  const boardSelectionHandler = vitest.fn()

  const { findAllByRole } = render(
    <Board
      cells={boardCells}
      handleSelection={boardSelectionHandler}
      disabled={false}
    />
  )

  const btns=
    await findAllByRole('button') as HTMLButtonElement[]

  it('should reflect changes to the board', async () => {
    await userEvent.click(btns[0])

    await waitFor(() => expect(boardSelectionHandler).toHaveBeenCalledOnce())
  })

  it('should not emit events on already selected elements', async () => {
    await userEvent.click(btns[0])

    await waitFor(() => expect(boardSelectionHandler).toHaveBeenCalledOnce())
  })

  it('should be disabled when set to true', () => {
    // TODO: do this

  })
})
