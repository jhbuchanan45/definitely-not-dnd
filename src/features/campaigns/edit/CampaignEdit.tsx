import { useAuth0 } from '@auth0/auth0-react';
import { Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Campaign from '../../../redux/campaign/campaign';
import { selectCampaignByID } from '../../../redux/campaign/campaignSlice';
import { fetchTokens } from '../../../redux/token/tokenSlice';
import authAPI from '../../common/authAPI';
import { selectTokensByCampaign } from '../../../redux/token/tokenSlice';
import Token from '../../../redux/token/token';
import TokenBrief from '../TokenBrief';
import { fetchMaps, selectMapsByCampaign } from '../../../redux/maps/mapSlice';
import MapBrief from '../MapBrief';

const useStyles = makeStyles((theme: Theme) => ({
    grid: {
        padding: theme.spacing(1)
    }
}));

const CampaignEdit = () => {
    const { grid } = useStyles();

    const match: any = useRouteMatch();
    const { campaignID } = match.params;

    const campaign: Campaign = useSelector(state => selectCampaignByID(state, campaignID));
    const tokens = useSelector((state) => selectTokensByCampaign(state, campaignID));
    const maps = useSelector((state) => selectMapsByCampaign(state, campaignID));
    console.log(maps)

    const dispatch = useDispatch();
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        // if (tokenStatus === 'idle') {
        authAPI(getAccessTokenSilently, { campaignID }, dispatch, fetchTokens);
        authAPI(getAccessTokenSilently, { campaignID }, dispatch, fetchMaps);
        // }
    }, []);


    const bigCampaignView = () => {

        return (
            <Grid container direction="row" style={{ height: "100%" }}>
                <Grid item xs={7} className={grid}>
                    <Typography variant="h4">Maps</Typography>
                    <Grid container spacing={1}>
                        {maps?.map((map: any) => (<Grid item><MapBrief map={map} /></Grid>))}
                    </Grid>
                </Grid>
                <Grid item xs={5} spacing={1} className={grid}>
                    <Typography variant="h4">Tokens</Typography>
                    <Typography variant="h5">Players</Typography>
                    <Grid container spacing={1}>
                        {campaign?.players.map((token: any) => (<Grid item><TokenBrief token={token} size="80px" /></Grid>))}
                    </Grid>
                    <Typography variant="h5">NPCs</Typography>
                    <Grid container spacing={1}>
                        {tokens?.map((token: Token) => (<Grid item><TokenBrief token={token} size="80px" /></Grid>))}
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    return (
        <Switch>
            <Route path={`${match.path}/maps/:mapId`}>
                <div>Map Edit</div>
            </Route>
            <Route path={match.path}>
                {bigCampaignView()}
            </Route>
        </Switch>
    )
}

export default CampaignEdit;
