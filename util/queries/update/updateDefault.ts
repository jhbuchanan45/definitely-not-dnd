import { Console } from 'console';
import { UseMutationResult } from 'react-query';
import API from '../../API';
import { getAuth } from '../../AuthCall';

const updateDefault = async (getAccessTokenSilently, endpoint, payload) => {

    const response = await API.put(endpoint, payload, {
        headers: { Authorization: `Bearer ${await getAuth(getAccessTokenSilently)}` }
    })

    return response.data;
}

// export const updateCampaign = async (getAuthAPI, campaignID, campaign) => await updateDefault(getAuthAPI, `/campaign/${campaignID}`, {campaign});
export const updateCampaign = (getAuthAPI, useMutation, enqueueSnackbar, queryClient, campaignID): UseMutationResult  => {
    return useMutation(campaign => updateDefault(getAuthAPI, `/campaign/${campaignID}`, { campaign }), {
        onSuccess: () => {
            queryClient.invalidateQueries('user');
            queryClient.invalidateQueries('campaigns');
            if (process.env.NODE_ENV === "development") {
                enqueueSnackbar("Updated campaign", { variant: "success" })
            }
        },
        onFailure: (err: any) => {
            enqueueSnackbar(err, { variant: "error" })
        }
    });
}

export const updateMap = (getAuthAPI, useMutation, enqueueSnackbar, queryClient, mapID): UseMutationResult  => {
    return useMutation(map => updateDefault(getAuthAPI, `/map/${mapID}`, { map }), {
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries(['map', mapID]);
            queryClient.invalidateQueries(['maps', data.campaignID])
            queryClient.invalidateQueries('campaigns');
            if (process.env.NODE_ENV === "development") {
                enqueueSnackbar("Updated campaign", { variant: "success" })
            }
        },
        onFailure: (err: any) => {
            enqueueSnackbar(err, { variant: "error" })
        }
    });
}

// export const postUser = async (getAuthAPI, user) => await postDefault(getAuthAPI, '/user', {user});

// export const postTokens = async (getAuthAPI, token) => await postDefault(getAuthAPI, `/token`, {token});

// export const postPlayers = async (getAuthAPI, token) => await postDefault(getAuthAPI, `/player`, {token});

// export const postMaps = async (getAuthAPI, map) => await postDefault(getAuthAPI, `/map`, {map});

export default updateDefault;