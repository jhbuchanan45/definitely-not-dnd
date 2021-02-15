import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampaigns, selectAllCampaigns, selectCampaignByID } from '../../redux/campaign/campaignSlice'
import CampaignSelect from './select/CampaignSelect';
import authAPI from '../common/authAPI';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import CampaignEdit from './edit/CampaignEdit';

const Campaigns = () => {
  // get state values
  const campaignStatus = useSelector((state: any) => state.campaign.status)
  let match = useRouteMatch();

  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  return (
    <Switch>
      <Route path={`${match.path}/:campaignID`}>
        <CampaignEdit />
      </Route>
      <Route path={match.path}>
        <CampaignSelect />
      </Route>
    </Switch>
  )
}

export default Campaigns;
