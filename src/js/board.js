import {ofLength, omit} from 'app/tools/list'
import {randBetween} from 'app/tools/rand'
import {compose, curry, reduce, concat, lensIndex, set} from 'ramda'

const emptyVal = []

// getByFilter :: (Object -> Boolean) -> Array -> Array([int, int])
// Get a list of a row, col coordinates in the map that return true when passed to the test function
const getByFilter = (test, board) =>
    reduce((acc, row) =>
        concat(
            acc,
            reduce((acc, col) =>
                concat(acc, test(board[row][col]) ? [[Number.parseInt(row), Number.parseInt(col)]] : []),
            [], Object.keys(board[row]))
        ),
    [], Object.keys(board))

export const createEmptyBoard = (width, height) => ofLength(height).map(() => ofLength(width).map(() => emptyVal))
export const isEmpty = x => x === emptyVal
export const fillRandom = curry((num, shouldPlace, createUnit, board) => {
    const result = reduce((acc, _) => {
        // no spots left
        if(acc.possibleLocations.length === 0) return acc

        const locationIndex = randBetween(0, acc.possibleLocations.length - 1)
        const location = acc.possibleLocations[locationIndex]

        console.log(acc, location) // stub

        return {
            board: set(compose(lensIndex(location[0]), lensIndex(location[1])), createUnit(), acc.board),
            possibleLocations: omit(locationIndex, acc.possibleLocations),
        }
    }, {
        board: board.slice(),
        possibleLocations: getByFilter(shouldPlace, board),
    }, ofLength(num))

    return result.board
    // use getByFilter to get possible locations to place

    // pick `num` of those at random and fill

    // be sure not to use same spot twice

    // quick if used all spots, even if haven't reached num
})
