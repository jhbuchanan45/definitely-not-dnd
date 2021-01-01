import { MOVE_TOKEN } from './mapTypes';
import { token } from './IMap';

export const moveToken = (token: token, pos: {x:number, y:number}) => (
    {
        type: MOVE_TOKEN,
        payload: {token, pos},
    }
)
