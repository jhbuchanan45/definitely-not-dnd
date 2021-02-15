import Token from './token';
import API from '../../utils/API';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    tokens: {} as any,
    status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null as String | null
}

export const fetchTokens = createAsyncThunk('token/fetchTokens', async (arg: any) => {
    const response: any = await API.get(`/token/campaign/${arg.campaignID}`, {
        headers: { Authorization: `Bearer ${arg.authJWT}` }
    });

    return response.data;
})

export const createToken = createAsyncThunk('token/createToken', async (arg: any) => {
    const response: any = await API.post('/token', {
        token: { ...arg.token }
    }, {
        headers: { Authorization: `Bearer ${arg.authJWT}` }
    });

    return response.data;
})

const token = createSlice({
    name: 'token',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchTokens.pending as any]: (state, action) => {
            state.status = 'loading';
        },
        [fetchTokens.fulfilled as any]: (state, action) => {
            state.status = 'succeeded';

            state.tokens[action.meta.arg.campaignID] = action.payload;
        },
        [fetchTokens.rejected as any]: (state, action) => {
            state.status = 'failed';

            // store error into state for further use
            state.error = action.error.message
        },

        [createToken.pending as any]: (state, action) => {
            state.status = 'loading';
        },
        [createToken.fulfilled as any]: (state, action) => {
            state.status = 'succeeded';

            if (state.tokens[action.payload.campaignId]) {
                state.tokens[action.payload.campaignId].push(action.payload)
            } else {
                state.tokens[action.payload.campaignId] = [action.payload]
            }
        },
        [createToken.rejected as any]: (state, action) => {
            state.status = 'failed';

            // store error into state for further use
            state.error = action.error.message
        }
    }
})

export const selectTokensByCampaign = (state, campaignID) => {
    return state.token.tokens[campaignID]
}

export default token.reducer;