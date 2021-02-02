import { MOVE_TOKEN, MOVE_MAP, SELECT_TOKEN, TOGGLE_SIDEBAR } from './mapTypes';
import { tile, token } from '../../features/map/IMap';
import produce from 'immer';
import exTokens from '../../features/map/exmTokens';

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

mapTiles[0] = mapTiles[0].map((tile) => {return {...tile, moveable:false}});

const mapTokens: token[] = exTokens;

const defaultToken: token = {
    _id: 0,
    ownerId: "",
    image: "",
    name: "No Token Selected",
    race: "Null",
    stats: {
        level: 0,
        key: {
            base: {
                END: 0,
                STR: 0,
                CHA: 0,
                FNS: 0,
                KNW: 0,
                WIS: 0,
                INT: 0,
            },
            modifier: {
                END: 0,
                STR: 0,
                CHA: 0,
                FNS: 0,
                KNW: 0,
                WIS: 0,
                INT: 0,
            },
        },
        alt: {
            dge: 0,
            bHP: 0,
            arm: 0,
        }
    },
    status: {
        cHP: 0,
        mHP: 0,
        cStm: 0,
        mStm: 0,
    },
    pos: {x: 0, y: 0},
    size: 0,
}

// ACTUAL REDUCERS

// TODO - Add reducer to update position of map from draggable and scale

const initialState = {
    id: 0,
    tiles: mapTiles,
    tokens: mapTokens,
    sqSize: 25,
    selectedToken: defaultToken,
    scale: 1,
    pos: {x: 0, y:0},
    sidebarExpanded: true,

}

export default (state: any = initialState, action) => {
     return produce(state, draft => {
        switch (action.type) {

        case MOVE_TOKEN: {
            draft.tokens.find((token: token) => (token._id === action.payload.token._id)).pos = {...action.payload.pos};
            break;
        }

        case MOVE_MAP: {
            draft.pos = {x: action.payload.x, y: action.payload.y};
            break;
        }

        case SELECT_TOKEN: {
            draft.selectedToken = action.payload
            break;
        }

        case TOGGLE_SIDEBAR: {
            draft.sidebarExpanded = state.sidebarExpanded ? false : true;
            break;
        }

        default:
            break;
        }
    })
}
