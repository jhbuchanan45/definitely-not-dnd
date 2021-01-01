import { MOVE_TOKEN } from './mapTypes';
import { tile, token } from './IMap';
import SnowflakeId from 'snowflake-id';
import produce from 'immer';

// default tile properties
const defaultTile: tile = {
    moveable: true, // if tokens can move through/be positioned here
    bgOpacity: 0.5, // background opacity [used along with bg and bd colour to show aoe effects and overlays]
    bgColour: [255,255,255], // background colour
    bdColour: "#000000", // border colour
    size: 25 // size in pixels
  }


// build example blank map with default titles
const mapTiles: Array<Array<tile>> = new Array(25).fill(Array(1));
mapTiles.forEach((el, ind, arr) => {
    arr[ind] = new Array(25).fill(defaultTile);
})

mapTiles[0] = mapTiles[0].map((tile) => {return {...tile, moveable:false}})

const snowflakeID = new SnowflakeId(); 

const mapTokens: token[] = [
{id: snowflakeID.generate(), name: "John", entity:{type: "player", id: 1, name: "John", maxHP: 10, defaultMovement: 30}, pos: {x: 5, y: 5}, size: 25},
{id: snowflakeID.generate(), name: "Tim", entity:{type: "player", id: 2, name: "Tim", maxHP: 10, defaultMovement: 15}, pos: {x: 6, y: 12}, size: 25},
{id: snowflakeID.generate(), name: "Gemima", entity:{type: "player", id: 3, name: "Gemima", maxHP: 13, defaultMovement: 35}, pos: {x: 20, y: 5}, size: 25}
]

const defaultToken: token = {
    name: "No Token Selected",
    entity: {type: "player", id: 0, name: "No Token", maxHP: 0},
    pos: {x: 0, y: 0},
    size: 0,
}

// ACTUAL REDUCERS

const initialState = {
    id: 0,
    tiles: mapTiles,
    tokens: mapTokens,
    sqSize: 25,
    selectedToken: defaultToken,
}

export default (state: any = initialState, action) => {
     return produce(state, draft => {
        switch (action.type) {

        case MOVE_TOKEN: {
                draft.tokens[action.token].pos = {...action.pos}
                break;
            }

        default:
            break;
        }
    })
}
