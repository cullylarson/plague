import {createEmptyBoard, fillRandom, isEmpty} from 'app/board'
import {human} from 'app/units'
import {compose} from 'ramda'
import {logM} from 'app/tools/debug'

compose(
    logM('board'),
    fillRandom(20, isEmpty, human)
)(createEmptyBoard(100, 100))
