import React from 'react'
import { fetchCampaign, fetchUser } from "../../util/queries/fetch/fetchDefault";
import { useQuery } from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';

const campaignWrapper = Component => props => {
    const { getAccessTokenSilently: getAuthToken } = useAuth0();

    const { data: user } = useQuery('user', async () => await fetchUser(getAuthToken));
    const { data: campaigns, ...campaignRes } = useQuery('campaigns', async () => await fetchCampaign(getAuthToken));

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

    return <Component campaigns={campaigns} lastCampaign={user.lastCampaign} />
}

export default campaignWrapper;