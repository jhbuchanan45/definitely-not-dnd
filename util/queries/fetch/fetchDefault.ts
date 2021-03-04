import API from '../../API';
import { getAuth } from '../../AuthCall';

const fetchDefault = async (getAccessTokenSilently, endpoint) => {

    const response = await API.get(endpoint, {
        headers: { Authorization: `Bearer ${await getAuth(getAccessTokenSilently)}` }
    })

    return response.data;
}

const defaultError = (enqueueSnackbar, errMsg?, successMsg?) => ({
    onError: (err: any) => {
        enqueueSnackbar(errMsg ? errMsg : err, { variant: "error" })
    },
    onSuccess: (data: any) => {
        if (process.env.NODE_ENV === "development") {
            enqueueSnackbar(successMsg, { variant: "success" });
        }
    }
})

const fetchCampaign = async (getAuthAPI) => await fetchDefault(getAuthAPI, '/campaign');
export const useCampaign = (getAuthAPI, useQuery, enqueueSnackbar) => {
    return useQuery('campaigns', async () => await fetchCampaign(getAuthAPI), {
        onError: (err: any) => {
            enqueueSnackbar(err, { variant: "error" })
        }
    });
}


const fetchUser = async (getAuthAPI) => await fetchDefault(getAuthAPI, '/user');
export const userQuery = (getAuthAPI, enqueueSnackbar): [any, any, any] => {
    return ['user', async () => await fetchUser(getAuthAPI), { ...defaultError(enqueueSnackbar, null, "Loaded User Successfully") }]
}
export const useUser = (getAuthAPI, useQuery, enqueueSnackbar) => {
    return useQuery(...userQuery(getAuthAPI, enqueueSnackbar));
}


export const fetchTokens = async (getAuthAPI, campaignID) => await fetchDefault(getAuthAPI, `/token/campaign/${campaignID}`);

export const fetchPlayers = async (getAuthAPI, campaignID) => await fetchDefault(getAuthAPI, `/player/campaign/${campaignID}`);

export const fetchMaps = async (getAuthAPI, campaignID) => await fetchDefault(getAuthAPI, `/map/campaign/${campaignID}`);

export const useMap = (getAuthAPI, useQuery, enqueueSnackbar, mapID) => {
    return useQuery(['map', mapID], async () => await fetchDefault(getAuthAPI, `map/${mapID}`), {
        ...defaultError(enqueueSnackbar, null, "Loaded User Successfully") 
    })
}

export default fetchDefault;