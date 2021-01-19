export interface tile {
    moveable: boolean,
    bgOpacity: number,
    bgColour: [number,number,number],
    bdColour: String,
    size: number,
}

export interface keyStats {
    END: number,
    STR: number,
    CHA: number,
    FNS: number,
    KNW: number,
    WIS: number,
    INT: number,
}

export interface altStats {
    dge: number,
    bHP: number,
    arm: number,
}

export interface resistStats {
    phy: number,
    rng: number,
    mag: number,
}

interface savedToken {
    _id: String,
    ownerId: String,
}

export type token = token & tokenID;

export interface baseToken {
    image: string,
    name: string,
    race: string,
    stats: {
        level: number,
        key: {
            base: keyStats,
            modifier: keyStats,
        },
        alt: altStats,
        resist?: resistStats,
    },
    status: {
        cHP: number,
        mHP: number,
        mStm: number,
        cStm: number
    }
    effects?: {
        burning: boolean,
        bleeding: boolean,
    },
    pos: {x: number, y: number},
    size: number,
}

// export interface token {
//     id?: number,
//     name: String,
//     entity: any,
//     pos: {x: number, y: number},
//     effects?: any[],
//     size: number,
// }

export interface effect {
    id?: number,
    affectedTiles: Array<{x: number, y: number}>
}