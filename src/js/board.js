import {ofLength, omit, indexes} from 'app/tools/list'
import {randBetween} from 'app/tools/rand'
import {BoardSize} from 'app/tools/containers'
import {filter, compose, curry, reduce, concat, lensIndex, set} from 'ramda'

const emptyVal = []

// getByFilter :: (Object -> Boolean) -> Array -> Array([int, int])
// Get a list of a row, col coordinates in the map that return true when passed to the test function
const getByFilter = (test, board) =>
    reduce(
        (acc, row) => concat(
                acc,
                reduce(
                    (acc, col) => concat(acc, test(board[row][col]) ? [[row, col]] : []),
                    [],
                    indexes(board[row])
                )
            ),
        [],
        indexes(board)
    )

export const getBoardSize = board => BoardSize(
    board.length,
    board.length ? board[0].length : 0
)

export const hasUnit = (unitTest, space) => filter(unitTest, space).length > 0

export const createEmptyBoard = (width, height) => ofLength(height).map(() => ofLength(width).map(() => emptyVal))
export const isEmpty = x => x === emptyVal

// fillRandom :: int -> (Object -> Bool) -> (_ -> Object) -> Array -> Array
// Puts a certain number of units into a board.
export const fillRandom = curry((num, shouldPlace, createUnit, board) => {
    const result = reduce(
        (acc, _) => {
            // no spots left
            if(acc.possibleLocations.length === 0) return acc

            const locationIndex = randBetween(0, acc.possibleLocations.length - 1)
            const location = acc.possibleLocations[locationIndex]

            return {
                board: set(compose(lensIndex(location[0]), lensIndex(location[1])), acc.board[location[0]][location[1]].concat([createUnit()]), acc.board),
                possibleLocations: omit(locationIndex, acc.possibleLocations),
            }
        }, {
            board: board.slice(),
            possibleLocations: getByFilter(shouldPlace, board),
        }, ofLength(num)
    )

    return result.board
})
