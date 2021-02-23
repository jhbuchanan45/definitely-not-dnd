import React from 'react'
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

interface Props {
    campaigns: any[],
    lastCampaign: any
}

const AllCampaigns = (props: Props) => {
    const { gridContainer, grid } = useStyles();

    const lastCampaign = props.lastCampaign;
    const campaigns = props.campaigns.filter(({_id}) => _id !== lastCampaign._id);

    return (
        <div className={gridContainer}>
            <Grid container spacing={2} className={grid}>
                {
                    campaigns.map((campaign: any) => {return (<Grid item key={campaign._id}><CampaignBrief campaign={campaign} /></Grid>)}
                    )
                }
            </Grid>
        </div>
    )
}

export default AllCampaigns
