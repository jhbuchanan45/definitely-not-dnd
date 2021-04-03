import API from '../../API';
import { getAuth } from '../../AuthCall';
import { Token } from '../../TokenParser';

const fetchDefault = async (getAccessTokenSilently, endpoint) => {

    const response = await API.get(endpoint, {
        headers: { Authorization: `Bearer ${await getAuth(getAccessTokenSilently)}` }
    })

    return response.data;
}

const defaultError = (enqueueSnackbar, errMsg?, successMsg?) => ({
    onError: (err: any) => {
        enqueueSnackbar(errMsg ? errMsg : err.message, { variant: "error" })
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
            enqueueSnackbar(err.message, { variant: "error" })
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

const fetchTokenDefault = async (getAuthAPI, tokenID, variant) => {
    const player = await fetchDefault(getAuthAPI, `/${variant}/${tokenID}`);

    return new Token(player);
};

const fetchTokensDefault = async (getAuthAPI, campaignID, variant) => {
    const tokens = await fetchDefault(getAuthAPI, `/${variant}/campaign/${campaignID}`);

    return tokens.map(token => new Token(token));
};


// will parse token data for displaying in sheet
// export const fetchTokens = async (getAuthAPI, campaignID) => {
//     const initialRes = await fetchDefault(getAuthAPI, `/token/campaign/${campaignID}`);

//     return initialRes;
// };

// export const fetchPlayers = async (getAuthAPI, campaignID) => await fetchDefault(getAuthAPI, `/player/campaign/${campaignID}`);

export const usePlayers = (getAuthAPI, useQuery, enqueueSnackbar, campaignID) => {
    return useQuery(['players', campaignID], async () => await fetchTokensDefault(getAuthAPI, campaignID, "player"), {
        ...defaultError(enqueueSnackbar, null, "Loaded Players Successfully")
    })
}

export const useTokens = (getAuthAPI, useQuery, enqueueSnackbar, campaignID) => {
    return useQuery(['tokens', campaignID], async () => await fetchTokensDefault(getAuthAPI, campaignID, "token"), {
        ...defaultError(enqueueSnackbar, null, "Loaded Tokens Successfully")
    })
}

export const usePlayer = (getAuthAPI, useQuery, enqueueSnackbar, playerID) => {
    return useQuery(['player', playerID], async () => await fetchTokenDefault(getAuthAPI, playerID, "player"), {
        ...defaultError(enqueueSnackbar, null, "Loaded Player Successfully")
    })
}

export const useToken = (getAuthAPI, useQuery, enqueueSnackbar, tokenID) => {
    return useQuery(['token', tokenID], async () => await fetchTokenDefault(getAuthAPI, tokenID, "token"), {
        ...defaultError(enqueueSnackbar, null, "Loaded Token Successfully")
    })
}

export const fetchMaps = async (getAuthAPI, campaignID) => await fetchDefault(getAuthAPI, `/map/campaign/${campaignID}`);

export const useMap = (getAuthAPI, useQuery, enqueueSnackbar, mapID) => {
    return useQuery(['map', mapID], async () => await fetchDefault(getAuthAPI, `map/${mapID}`), {
        ...defaultError(enqueueSnackbar, null, "Loaded User Successfully")
    })
}

export default fetchDefault;