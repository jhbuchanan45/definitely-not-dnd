import Token from './player';
import API from '../../utils/API';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    players: {} as any,
    status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null as String | null
}

export const fetchPlayers = createAsyncThunk('player/fetchPlayers', async (arg: any) => {
    const response: any = await API.get(`/player/campaign/${arg.campaignID}`, {
        headers: { Authorization: `Bearer ${arg.authJWT}` }
    });

    return response.data;
})

export const createPlayer = createAsyncThunk('player/createPlayer', async (arg: any) => {
    const response: any = await API.post('/player', {
        token: { ...arg.player }
    }, {
        headers: { Authorization: `Bearer ${arg.authJWT}` }
    });

    return response.data;
})

const player = createSlice({
    name: 'token',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchPlayers.pending as any]: (state, action) => {
            state.status = 'loading';
        },
        [fetchPlayers.fulfilled as any]: (state, action) => {
            state.status = 'succeeded';

            state.players[action.meta.arg.campaignID] = action.payload;
        },
        [fetchPlayers.rejected as any]: (state, action) => {
            state.status = 'failed';

            // store error into state for further use
            state.error = action.error.message
        },

        [createPlayer.pending as any]: (state, action) => {
            state.status = 'loading';
        },
        [createPlayer.fulfilled as any]: (state, action) => {
            state.status = 'succeeded';

            if (state.players[action.payload.campaignId]) {
                state.players[action.payload.campaignId].push(action.payload)
            } else {
                state.players[action.payload.campaignId] = [action.payload]
            }
        },
        [createPlayer.rejected as any]: (state, action) => {
            state.status = 'failed';

            // store error into state for further use
            state.error = action.error.message
        }
    }
})

export const selectPlayersByCampaign = (state, campaignID) => {
    return state.player.players[campaignID]
}

export default player.reducer;