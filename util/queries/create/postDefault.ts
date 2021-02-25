import API from '../../API';
import { getAuth } from '../../AuthCall';

const postDefault = async (getAccessTokenSilently, endpoint, payload) => {

    const response = await API.post(endpoint, payload, {
        headers: { Authorization: `Bearer ${await getAuth(getAccessTokenSilently)}` }
    })

    return response.data;
}

export const postCampaign = async (getAuthAPI, campaign) => await postDefault(getAuthAPI, '/campaign', {campaign});

export const postUser = async (getAuthAPI, user) => await postDefault(getAuthAPI, '/user', {user});

export const postTokens = async (getAuthAPI, token) => await postDefault(getAuthAPI, `/token`, {token});

export const postPlayers = async (getAuthAPI, token) => await postDefault(getAuthAPI, `/player`, {token});

export const postMaps = async (getAuthAPI, map) => await postDefault(getAuthAPI, `/map`, {map});

export default postDefault;