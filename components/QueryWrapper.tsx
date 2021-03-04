import { useAuth0 } from '@auth0/auth0-react';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useCampaign, useUser, userQuery } from '../util/queries/fetch/fetchDefault';
import LoadingSpinner from './LoadingSpinner';

const QueryWrapper = (props: any) => {
    const { getAccessTokenSilently: getAuthToken } = useAuth0();
    const { enqueueSnackbar } = useSnackbar();

    const { data: user, ...userRes } = useUser(getAuthToken, useQuery, enqueueSnackbar);
    const { data: campaigns } = useCampaign(getAuthToken, useQuery, enqueueSnackbar);

    if (userRes.isLoading) {
        return (
            <LoadingSpinner />
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

