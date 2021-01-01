export interface tile {
    moveable: boolean,
    bgOpacity: number,
    bgColour: [number,number,number],
    bdColour: String,
    size: number,
}

export interface token {
    id?: number,
    name: String,
    entity: any,
    pos: {x: number, y: number},
    effects?: any[],
    size: number,
}

export interface effect {
    id?: number,
    affectedTiles: Array<{x: number, y: number}>
}