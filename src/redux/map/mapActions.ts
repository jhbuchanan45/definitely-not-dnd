import { MOVE_TOKEN, MOVE_MAP, SELECT_TOKEN, TOGGLE_SIDEBAR } from './mapTypes';
import { token } from '../../features/map/IMap';

export const moveToken = (token: token, pos: {x:number, y:number}) => (
    {
        type: MOVE_TOKEN,
        payload: {token, pos},
    }
)

export const moveMap = (pos: {x: number, y:number}) => (
    {
        type: MOVE_MAP,
        payload: pos,
    }
)

export const selectToken = (payload:token) => (
    {
        type: SELECT_TOKEN,
        payload
    }
)

export const toggleSidebar = () => (
    {
        type: TOGGLE_SIDEBAR,
    }
)
