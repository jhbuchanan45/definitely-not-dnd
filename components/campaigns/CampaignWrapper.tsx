import React from 'react'
import { useCampaign, useUser } from "../../util/queries/fetch/fetchDefault";
import { useQuery } from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { useSnackbar } from 'notistack';

const campaignWrapper = Component => props => {
    const { getAccessTokenSilently: getAuthToken } = useAuth0();
    const { enqueueSnackbar } = useSnackbar();

    const { data: user } = useUser(getAuthToken, useQuery, enqueueSnackbar);
    const { data: campaigns, ...campaignRes } = useCampaign(getAuthToken, useQuery, enqueueSnackbar);

    // TODO - Add custom component to guide through new campaign creation

    if (campaignRes.isLoading) {
        return (
            <div>
                Campaigns Loading
            </div>
        )
    }

    if (campaignRes.isError) {
        return (
            <div>
                Campaigns Loading ERROR
            </div>
        )
    }

    return <Component campaigns={campaigns} lastCampaign={user?.lastCampaign} refetchCampaigns={campaignRes.refetch} />
}

export default campaignWrapper;