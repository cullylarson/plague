export const human = () => ({kind: 'human'})
export const infected = () => ({kind: 'infected'})

export const isHuman = space => space.hasOwnProperty('kind') && space.kind === 'human'
export const isInfected = space => space.hasOwnProperty('kind') && space.kind === 'infected'
