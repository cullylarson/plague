import {curry} from 'ramda'

export const log = x => console.log(x)
export const logM = curry((msg, x) => console.log(msg, x))
