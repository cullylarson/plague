export function randBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// flip :: float -> bool
// Provide a float 0 <= x < 1, which are the chances of getting a true.  E.g. .25 would be a 1/4 chance of getting a true
export const flip = chance => Math.random() <= chance

export const pickRandom = xs => {
    const keys = Object.keys(xs)

    if(!keys.length) return undefined

    return xs[keys[randBetween(0, keys.length - 1)]]
}
