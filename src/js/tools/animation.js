import {curry} from 'ramda'

export const animate = curry((fps, f, initial) => {
    const interval = 1000 / fps
    let then = Date.now()
    let lastReturn = initial

    const doAnimate = () => {
        requestAnimationFrame(doAnimate)

        const now = Date.now()
        const delta = now - then

        if (delta > interval) {
            then = now - (delta % interval)
            lastReturn = f(lastReturn)
        }
    }

    doAnimate()
})
