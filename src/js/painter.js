import {Size, Point} from 'app/tools/containers'
import {getBoardSize, isEmpty, hasUnit} from 'app/board'
import {isHuman} from 'app/units'
import {curry, reduce} from 'ramda'

const getSpaceSize = (board, el) => {
    const boardSize = getBoardSize(board)

    return Size(
        el.width / boardSize.cols,
        el.height / boardSize.rows
    )
}

const drawSpace = curry((ctx, spaceSize, atPoint, space) => {
    if(isEmpty(space)) ctx.fillStyle = 'black'
    else if(hasUnit(isHuman, space)) ctx.fillStyle = 'red'

    ctx.fillRect(atPoint.x, atPoint.y, spaceSize.width, spaceSize.height)
})

export const paint = curry((el, board) => {
    const ctx = el.getContext('2d')
    const spaceSize = getSpaceSize(board, el)

    // clear
    ctx.clearRect(0, 0, el.width, el.height)

    reduce((y, row) => {
        reduce((x, space) => {
            drawSpace(ctx, spaceSize, Point(x, y), space)
            return x + spaceSize.width
        }, 0, row)

        return y + spaceSize.height
    }, 0, board)
})
