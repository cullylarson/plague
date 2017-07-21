import {createEmptyBoard, fillRandom, isEmpty} from 'app/board'
import {human} from 'app/units'
import {compose} from 'ramda'
import {logM} from 'app/tools/debug'
import {paint} from 'app/painter'

window.Plague = (el, width, height) => {
    compose(
        paint(el),
        logM('board'),
        fillRandom(20, isEmpty, human)
    )(createEmptyBoard(width, height))
}
