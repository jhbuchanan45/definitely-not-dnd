import Campaign from './campaign';
import API from '../../utils/API';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    campaigns: [] as Campaign[],
    status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null as String | null
}

export const fetchCampaigns = createAsyncThunk('campaign/fetchCampaigns', async (arg: any) => {
    const response: any = await API.get('/campaign', {
        headers: { Authorization: `Bearer ${arg.authJWT}` }
    });

    return response.data;
})

export const createCampaign = createAsyncThunk('campaign/createCampaign', async (arg: any) => {
    const response: any = await API.post('/campaign', {
        campaign: { ...arg.campaign }
    }, {
        headers: { Authorization: `Bearer ${arg.authJWT}` }
    });

    return response.data;
})

export const updateCampaign = createAsyncThunk('campaign/updateCampaign', async (arg: any) => {
    const response: any = await API.put('/campaign', {
        campaign: { ...arg.campaign }
    }, {
        headers: { Authorization: `Bearer ${arg.authJWT}` }
    });

    return response.data;
})

const campaign = createSlice({
    name: 'campaign',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCampaigns.pending as any]: (state, action) => {
            state.status = 'loading';
        },
        [fetchCampaigns.fulfilled as any]: (state, action) => {
            state.status = 'succeeded';

            // add campaign details to slice
            state.campaigns = action.payload;
        },
        [fetchCampaigns.rejected as any]: (state, action) => {
            state.status = 'failed';

            // store error into state for further use
            state.error = action.error.message
        },

        [createCampaign.pending as any]: (state, action) => {
            state.status = 'loading';
        },
        [createCampaign.fulfilled as any]: (state, action) => {
            state.status = 'succeeded';

            // add campaign details to slice
            state.campaigns?.push(action.payload);
        },
        [createCampaign.rejected as any]: (state, action) => {
            state.status = 'failed';

            // store error into state for further use
            state.error = action.error.message
        },

        [updateCampaign.pending as any]: (state, action) => {
            state.status = 'loading';
        },
        [updateCampaign.fulfilled as any]: (state, action) => {
            state.status = 'succeeded';

            // add campaign details to slice
            let campaign = state.campaigns?.find(campaign => campaign._id === action.payload._id);
            campaign = action.payload;
        },
        [updateCampaign.rejected as any]: (state, action) => {
            state.status = 'failed';

            // store error into state for further use
            state.error = action.error.message
        },
    }
})

export const selectAllCampaigns = state => state.campaign.campaigns

export const selectCampaignByID = (state, campaignID) => state.campaign.campaigns?.find(campaign => campaign.id === campaignID)

export default campaign.reducer;