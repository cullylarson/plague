import {createEmptyBoard, fillRandom, isEmpty} from 'app/board'
import {human} from 'app/units'
import {compose} from 'ramda'

const board = compose(
    fillRandom(20, isEmpty, human)
)(createEmptyBoard(100, 100))

console.log(board)
