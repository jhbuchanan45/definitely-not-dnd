import { Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react'
import { useSelector } from 'react-redux';
import Campaign from '../../../redux/campaign/campaign';
import { selectCampaignByID } from '../../../redux/campaign/campaignSlice';
import CampaignBrief from '../CampaignBrief';
import MapBrief from '../MapBrief';
import TokenBrief from '../TokenBrief';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        padding: theme.spacing(0.5) + "px"
    },
    playerGrid: {
        display: 'grid',
        gridAutoColumns: '250px',
        gridTemplateRows: '1fr 1fr',
        gridAutoFlow: 'column',
        position: 'absolute',
        gap: theme.spacing(1) + "px"
    },
    gridParent: {
        overflowX: 'hidden',
        overflowY: 'hidden',
        position: 'relative',
        scrollbarColor: '#00000000 #00000000',
        scrollbarWidth: 'thin',
        '&:hover': {
            scrollbarColor: theme.palette.primary.light + '#00000000',
            overflowX: 'auto'
        }
    }

}));

const Resume = () => {
    const { container, playerGrid, gridParent } = useStyles();

    const lastCampaignID = useSelector((state: any) => state.user.details?.lastCampaign);
    const lastCampaign: Campaign = useSelector(state => selectCampaignByID(state, lastCampaignID));

    const tokens = () => {
        let tokenBriefs: any[] = [];

        lastCampaign?.players?.forEach(player => { tokenBriefs.push(<div><TokenBrief size={"100px"} token={player} /></div>) })

        return tokenBriefs
    }

    return (
        <>
            <Typography variant="h4">Resume Campaign</Typography>
            <Grid container className={container} spacing={1} direction="row">
                <Grid item>
                    <CampaignBrief campaignId={lastCampaignID} />
                </Grid>
                <Grid item>
                    <Grid container direction="column" style={{ height: '100%' }}>
                        <Grid item>
                            <Typography variant="h5">Current Map</Typography>
                        </Grid>
                        <Grid item xs>
                            <MapBrief map={{...lastCampaign?.lastMap, campaignId: lastCampaign?._id}} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs style={{}}>
                    <Grid container direction="column" style={{ height: '100%' }}>
                        <Grid item>
                            <Typography variant="h5">Players</Typography>
                        </Grid>
                        <Grid item xs className={gridParent}>
                            <div className={playerGrid}>
                                {tokens()}
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default Resume
