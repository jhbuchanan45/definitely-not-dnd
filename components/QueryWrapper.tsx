import { useAuth0 } from '@auth0/auth0-react';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { fetchCampaign, fetchUser } from '../util/queries/fetch/fetchDefault';
import LoadingSpinner from './LoadingSpinner';

const QueryWrapper = (props: any) => {
    const { getAccessTokenSilently: getAuthToken } = useAuth0();
    const { enqueueSnackbar } = useSnackbar();

    const { data: user, ...userRes } = useQuery('user', async () => await fetchUser(getAuthToken));

    const { data: campaigns } = useQuery('campaigns', async () => await fetchCampaign(getAuthToken), {
        onError: (err: any) => {
            enqueueSnackbar(err, {variant: "error"})
        }
    });

    if (userRes.isLoading) {
        return (
            <LoadingSpinner />
        )
    }

    if (userRes.isError) {
        return (
            <div>
                User Loading ERROR
            </div>
        )
    }

    return (
        <>
            {props.children}
            <ReactQueryDevtools initialIsOpen={false} />
        </>
    )
}

export default QueryWrapper

