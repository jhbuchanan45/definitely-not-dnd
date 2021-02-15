import React from 'react'
import { useSelector } from 'react-redux';
import Campaign from '../../../redux/campaign/campaign';
import { selectAllCampaigns } from '../../../redux/campaign/campaignSlice';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import CampaignBrief from '../CampaignBrief';

const useStyles = makeStyles((theme: Theme) => ({
    gridContainer: {
        overflow: 'hidden auto',
        position: 'relative',
        height: '100%',
        scrollbarColor: '#00000000 #00000000',
        scrollbarWidth: 'thin',
        '&:hover': {
            scrollbarColor: theme.palette.primary.light + '#00000000',
        }
    },
    grid: {
        position: 'absolute'
    }
}
));

const AllCampaigns = () => {
    const { gridContainer, grid } = useStyles();

    const lastCampaignID = useSelector((state: any) => state.user.details?.lastCampaign);
    const campaigns = [...useSelector(state => selectAllCampaigns(state, lastCampaignID))];

    return (
        <div className={gridContainer}>
            <Grid container spacing={2} className={grid}>
                {
                    campaigns.map((campaign: Campaign) => {return (<Grid item><CampaignBrief campaignId={campaign._id} /></Grid>)}
                    )
                }
            </Grid>
        </div>
    )
}

export default AllCampaigns
