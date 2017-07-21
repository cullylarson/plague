import {flip, pickRandom} from 'app/tools/rand'
import {logM} from 'app/tools/debug'
import {compose, reduce, filter, set, lensPath, append, dissocPath} from 'ramda'

const Location = (row, col, i) => ({row, col, i})

const shouldMove = () => flip(0.75)
const isTruey = x => !!x

const canMoveUp = (rowIdx) => rowIdx > 0
const canMoveDown = (board, rowIdx) => rowIdx < (board.length - 1)
const canMoveLeft = (colIdx) => colIdx > 0
const canMoveRight = (board, colIdx) => board.length && colIdx < (board[0].length - 1)

const moveUnit = (from, to, board) => {
    return compose(
        logM(`after: (${from.row}, ${from.col}, ${from.i}) -> (${to.row}, ${to.col})`),
        dissocPath(
            [from.row, from.col, from.i]
        ),
        set(
            lensPath([to.row, to.col]),
            append(board[from.row][from.col][from.i], board[to.row][to.col])
        ),
        logM(`before: (${from.row}, ${from.col}, ${from.i}) -> (${to.row}, ${to.col})`)
    )(board)
}

// TODO -- there's a bug here.  Each iteration gives us a new board, but we're using old indexes (i.e. the unitIdx may no longer exist in the new board)
const move = (board) => reduce(
    (board, rowIdx) => reduce(
        (board, colIdx) => reduce(
            (board, unitIdx) => {
                // shouldn't move
                if(!shouldMove()) return board

                const possibleMovements = filter(isTruey, [
                    canMoveUp(rowIdx) ? 'up' : false,
                    canMoveDown(board, rowIdx) ? 'down' : false,
                    canMoveLeft(colIdx) ? 'left' : false,
                    canMoveRight(board, colIdx) ? 'right' : false,
                ])

                // can't move
                if(!possibleMovements.length) return board

                const movement = pickRandom(possibleMovements)

                switch(movement) {
                    case 'up':
                        return moveUnit(
                            Location(rowIdx, colIdx, unitIdx),
                            Location(rowIdx - 1, colIdx, null),
                            board
                        )
                    case 'down':
                        return moveUnit(
                            Location(rowIdx, colIdx, unitIdx),
                            Location(rowIdx + 1, colIdx, null),
                            board
                        )
                    case 'left':
                        return moveUnit(
                            Location(rowIdx, colIdx, unitIdx),
                            Location(rowIdx, colIdx - 1, null),
                            board
                        )
                    case 'right':
                        return moveUnit(
                            Location(rowIdx, colIdx, unitIdx),
                            Location(rowIdx, colIdx + 1, null),
                            board
                        )
                }
            },
            board, board[rowIdx][colIdx].keys()
        ),
        board, board[rowIdx].keys()
    ),
    board, board.keys()
)

const react = (board) => {
    return board
}

export const step = compose(
    react,
    move
)
