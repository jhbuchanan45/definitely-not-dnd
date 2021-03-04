import { UseMutationResult } from 'react-query';
import API from '../../API';
import { getAuth } from '../../AuthCall';

const deleteDefault = async (getAccessTokenSilently, endpoint) => {

    const response = await API.delete(endpoint, {
        headers: { Authorization: `Bearer ${await getAuth(getAccessTokenSilently)}` }
    })

    return response.data;
}

export const deleteCampaign = (getAuthAPI, useMutation, enqueueSnackbar, queryClient, campaignID): UseMutationResult => {
    return useMutation(() => deleteDefault(getAuthAPI, `/campaign/${campaignID}`), {
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
    }) 
};

export const postUser = async (getAuthAPI, user) => await deleteDefault(getAuthAPI, '/user');

export const postTokens = async (getAuthAPI, token) => await deleteDefault(getAuthAPI, `/token`);

export const postPlayers = async (getAuthAPI, token) => await deleteDefault(getAuthAPI, `/player`);

export const postMaps = async (getAuthAPI, map) => await deleteDefault(getAuthAPI, `/map`);

export default deleteDefault;