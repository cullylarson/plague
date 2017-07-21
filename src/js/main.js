import {createEmptyBoard, fillRandom, isEmpty} from 'app/board'
import {human, infected} from 'app/units'
import {compose} from 'ramda'
import {paint} from 'app/painter'
import {animate} from 'app/tools/animation'
import {step} from 'app/brain'

window.Plague = (el, width, height) => {
    compose(
        animate(1, compose(
            step,
            paint(el)
        )),
        fillRandom(5, isEmpty, infected),
        fillRandom(20, isEmpty, human)
    )(createEmptyBoard(width, height))
}
