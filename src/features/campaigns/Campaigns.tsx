import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampaigns, selectAllCampaigns, selectCampaignByID } from '../../redux/campaign/campaignSlice'
import CampaignSelect from './select/CampaignSelect';

const Campaigns = () => {
  // get state values
  const campaignStatus = useSelector((state: any) => state.campaign.status)
  
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  
  useEffect(() => {
    if (campaignStatus === 'idle') {
      (async () => {
        await getAccessTokenSilently({
          audience: `https://api.definitelynotdnd.com`,
        })
        .then(authJWT => {
          dispatch(fetchCampaigns({ authJWT }))
        })
        .catch(err => {
          console.log(err);
        })
        
      })();
    }
  }, []);

  return (
    <CampaignSelect />
  )
}

export default Campaigns;
