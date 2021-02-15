import Map from './map';
import API from '../../utils/API';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {store} from '../store'
import { fetchCampaigns } from '../campaign/campaignSlice';

const initialState = {
    maps: {} as any,
    status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null as String | null
}

export const fetchMaps = createAsyncThunk('map/fetchMaps', async (arg: any) => {
    const response: any = await API.get(`/map/campaign/${arg.campaignID}`, {
        headers: { Authorization: `Bearer ${arg.authJWT}` }
    });

    return response.data;
})

export const createMap = createAsyncThunk('map/createMap', async (arg: any) => {
    const response: any = await API.post('/map', {
        map: { ...arg.map }
    }, {
        headers: { Authorization: `Bearer ${arg.authJWT}` }
    });

    return response.data;
})

const map = createSlice({
    name: 'maps',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchMaps.pending as any]: (state, action) => {
            state.status = 'loading';
        },
        [fetchMaps.fulfilled as any]: (state, action) => {
            state.status = 'succeeded';

            state.maps[action.meta.arg.campaignID] = action.payload;
        },
        [fetchMaps.rejected as any]: (state, action) => {
            state.status = 'failed';

            // store error into state for further use
            state.error = action.error.message
        },

        [createMap.pending as any]: (state, action) => {
            state.status = 'loading';
        },
        [createMap.fulfilled as any]: (state, action) => {
            state.status = 'succeeded';

            if (state.maps[action.payload.campaignId]) {
                state.maps[action.payload.campaignId].push(action.payload)
            } else {
                state.maps[action.payload.campaignId] = [action.payload]
            }
        },
        [createMap.rejected as any]: (state, action) => {
            state.status = 'failed';

            // store error into state for further use
            state.error = action.error.message
        }
    }
})

export const selectMapsByCampaign = (state, campaignID) => {
    return state.maps.maps[campaignID]
}

export default map.reducer;