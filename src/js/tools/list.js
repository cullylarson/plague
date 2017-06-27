import {curry} from 'ramda'

export const ofLength = x => Array.apply(null, Array(x))
export const omit = curry((i, x) => ([...x.slice(0, i), ...x.slice(i + 1)]))
export const indexes = x => Object.keys(x).map(x => Number.parseInt(x))
