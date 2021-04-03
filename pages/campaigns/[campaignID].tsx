import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { fetchMaps, usePlayers, useTokens } from '../../util/queries/fetch/fetchDefault';
import { useAuth0 } from '@auth0/auth0-react';
import { Grid, Typography, Switch, makeStyles, Button } from '@material-ui/core';
import MapBrief from '../../components/campaigns/MapBrief';
import TokenBrief from '../../components/campaigns/TokenBrief';
import campaignWrapper from '../../components/campaigns/CampaignWrapper';
import AddButton from '../../components/AddButton';
import { postMaps, postPlayers, postTokens } from '../../util/queries/create/postDefault';
import Link from 'next/link';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme: any) => ({
    grid: {
        padding: theme.spacing(1)
    },
    scrollContainer: {
        position: "absolute",
    },
    mapContainer: {
        overflow: 'hidden auto',
        position: 'relative',
        height: '100%',
        scrollbarColor: '#00000000 #00000000',
        scrollbarWidth: 'thin',
        '&:hover': {
            scrollbarColor: theme.palette.primary.light + '#00000000',
        }
    },
    tokenSubContainer: {
        position: "relative",
        marginBottom: theme.spacing(1.5)
    },
    container: {
        padding: theme.spacing(1) + "px",
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        position: "relative"
    },
    floatButton: {
        position: "absolute",
        right: 0,
        top: 0
    }
}));

const EditCampaign = (props: any) => {
    const { grid, scrollContainer, mapContainer, container, floatButton, tokenSubContainer } = useStyles();

    const router = useRouter();
    const { campaignID } = router.query;

    const campaign = props.campaigns.find(({ _id }) => _id === campaignID);

    const { getAccessTokenSilently: getAuthToken } = useAuth0();
    const { enqueueSnackbar } = useSnackbar();

    const { data: tokens, ...tokenQuery } = useTokens(getAuthToken, useQuery, enqueueSnackbar, campaignID);
    const { data: players } = usePlayers(getAuthToken, useQuery, enqueueSnackbar, campaignID);
    const { data: maps } = useQuery(['maps', campaignID], () => fetchMaps(getAuthToken, campaignID));

    const bigCampaignView = () => {

        return (
            <>
                <Link href={`/campaigns/edit/${campaignID}`}><Button>Edit Campaign</Button></Link>
                <Grid container direction="row" style={{ height: "100%" }}>
                    <Grid item xs={7} className={grid}>
                        <div className={container}>
                            <Typography variant="h4">Maps</Typography>
                            <div className={mapContainer}>
                                <Grid container className={scrollContainer} alignItems="flex-start" spacing={1}>
                                    {maps?.map((map: any) => (<Grid item><MapBrief map={map} style={{ height: "230px" }} /></Grid>))}
                                </Grid>
                            </div>
                            <AddButton className={floatButton} postFunc={postMaps} defaultItem={{ campaignId: campaignID }} invalidate={[["maps", campaignID]]} label="New Map" />
                        </div>
                    </Grid>
                    <Grid item xs={5} spacing={1} className={grid}>
                        <Typography variant="h4">Tokens</Typography>
                        <div className={mapContainer}>
                            <div className={tokenSubContainer}>
                                <Typography variant="h5">Players</Typography>
                                <Grid container spacing={1}>
                                    {players?.map((token: any) => (<Grid item><TokenBrief token={token} size="80px" variant="players" /></Grid>))}
                                </Grid>
                                <AddButton className={floatButton} postFunc={postPlayers} defaultItem={{ campaignId: campaignID, image: "huh" }} invalidate={["players"]} label="New Player" />
                            </div>
                            <div className={tokenSubContainer}>
                                <Typography variant="h5">NPCs</Typography>
                                <Grid container spacing={1}>
                                    {tokens?.map((token: any) => (<Grid item><TokenBrief token={token} size="80px" variant="tokens" /></Grid>))}
                                </Grid>
                                <AddButton className={floatButton} postFunc={postTokens} defaultItem={{ campaignId: campaignID, image: "huh" }} invalidate={["tokens"]} label="New NPC" />
                            </div>
                        </div>
                    </Grid>
                </Grid >
            </>
        )
    }

    return (
        <>
            {bigCampaignView()}
        </>
    )
}

export default campaignWrapper(EditCampaign);
