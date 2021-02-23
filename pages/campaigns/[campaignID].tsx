import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { fetchMaps, fetchTokens } from '../../util/queries/fetch/fetchDefault';
import { useAuth0 } from '@auth0/auth0-react';
import { Grid, Typography, Switch, makeStyles } from '@material-ui/core';
import { match } from 'assert';
import MapBrief from '../../components/campaigns/MapBrief';
import TokenBrief from '../../components/campaigns/TokenBrief';

const useStyles = makeStyles((theme: any) => ({
    grid: {
        padding: theme.spacing(1)
    }
}));

const EditCampaign = () => {
    const { grid } = useStyles();

    const router = useRouter();
    const { campaignID } = router.query;

    const { getAccessTokenSilently: getAuthToken } = useAuth0();

    const { data: tokens } = useQuery(['tokens', campaignID], () => fetchTokens(getAuthToken, campaignID));
    const { data: maps } = useQuery(['maps', campaignID], () => fetchMaps(getAuthToken, campaignID));

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
                        {/* {campaign?.players.map((token: any) => (<Grid item><TokenBrief token={token} size="80px" /></Grid>))} */}
                    </Grid>
                    <Typography variant="h5">NPCs</Typography>
                    <Grid container spacing={1}>
                        {tokens?.map((token: any) => (<Grid item><TokenBrief token={token} size="80px" /></Grid>))}
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    return (
        <>
            {bigCampaignView()}
        </>
    )
}

export default EditCampaign
