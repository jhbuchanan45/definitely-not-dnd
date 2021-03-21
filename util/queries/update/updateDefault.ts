import { Console } from 'console';
import { UseMutationResult } from 'react-query';
import API from '../../API';
import { getAuth } from '../../AuthCall';

const updateDefault = async (getAccessTokenSilently, endpoint, payload, enqueueSnackbar) => {

    const response = await API.put(endpoint, payload, {
        headers: { Authorization: `Bearer ${await getAuth(getAccessTokenSilently)}` }
    })
    return response.data;

}

// export const updateCampaign = async (getAuthAPI, campaignID, campaign) => await updateDefault(getAuthAPI, `/campaign/${campaignID}`, {campaign});
export const updateCampaign = (getAuthAPI, useMutation, enqueueSnackbar, queryClient, campaignID): UseMutationResult => {
    return useMutation(campaign => updateDefault(getAuthAPI, `/campaign/${campaignID}`, { campaign }, enqueueSnackbar), {
        onSuccess: () => {
            queryClient.invalidateQueries('user');
            queryClient.invalidateQueries('campaigns');
            if (process.env.NODE_ENV === "development") {
                enqueueSnackbar("Updated campaign", { variant: "success" })
            }
        },
        onError: (err) => {
            enqueueSnackbar(err.message, { variant: "error" })
        }
    });
}

export const updateMap = (getAuthAPI, useMutation, enqueueSnackbar, queryClient, mapID): UseMutationResult => {
    return useMutation(map => updateDefault(getAuthAPI, `/map/${mapID}`, { map }, enqueueSnackbar), {
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries(['map', mapID]);
            queryClient.invalidateQueries(['maps', data.campaignID])
            queryClient.invalidateQueries('campaigns');
            if (process.env.NODE_ENV === "development") {
                enqueueSnackbar("Updated map", { variant: "success" })
            }
        },
        onError: (err: any) => {
            enqueueSnackbar(err, { variant: "error" })
        }
    });
}

export const updateToken = (getAuthAPI, useMutation, enqueueSnackbar, queryClient, tokenID): UseMutationResult => {
    return useMutation(token => updateDefault(getAuthAPI, `/token/${tokenID}`, { token }, enqueueSnackbar), {
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries(['token', tokenID]);
            queryClient.invalidateQueries(['tokens', data.campaignID])
            queryClient.invalidateQueries('campaigns');
            if (process.env.NODE_ENV === "development") {
                enqueueSnackbar("Updated token", { variant: "success" })
            }
        },
        onError: (err: any) => {
            enqueueSnackbar(err, { variant: "error" })
        }
    });
}

export const updatePlayer = (getAuthAPI, useMutation, enqueueSnackbar, queryClient, playerID): UseMutationResult => {
    return useMutation(player => updateDefault(getAuthAPI, `/player/${playerID}`, { player }, enqueueSnackbar), {
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries(['player', playerID]);
            queryClient.invalidateQueries(['players', data.campaignID])
            queryClient.invalidateQueries('campaigns');
            if (process.env.NODE_ENV === "development") {
                enqueueSnackbar("Updated player", { variant: "success" })
            }
        },
        onError: (err: any) => {
            enqueueSnackbar(err, { variant: "error" })
        }
    });
}

// export const postUser = async (getAuthAPI, user) => await postDefault(getAuthAPI, '/user', {user});

// export const postTokens = async (getAuthAPI, token) => await postDefault(getAuthAPI, `/token`, {token});

// export const postPlayers = async (getAuthAPI, token) => await postDefault(getAuthAPI, `/player`, {token});

// export const postMaps = async (getAuthAPI, map) => await postDefault(getAuthAPI, `/map`, {map});

export default updateDefault;