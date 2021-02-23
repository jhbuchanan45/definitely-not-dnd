import API from '../../API';
import { getAuth } from '../../AuthCall';

const fetchDefault = async (getAccessTokenSilently, endpoint) => {

    const response = await API.get(endpoint, {
        headers: { Authorization: `Bearer ${await getAuth(getAccessTokenSilently)}` }
    })

    return response.data;
}

export const fetchCampaign = async (getAuthAPI) => await fetchDefault(getAuthAPI, '/campaign');

export const fetchUser = async (getAuthAPI) => await fetchDefault(getAuthAPI, '/user');

export const fetchTokens = async (getAuthAPI, campaignID) => await fetchDefault(getAuthAPI, `/token/campaign/${campaignID}`);

export const fetchMaps = async (getAuthAPI, campaignID) => await fetchDefault(getAuthAPI, `/map/campaign/${campaignID}`);

export default fetchDefault;