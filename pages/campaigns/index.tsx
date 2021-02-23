import React from 'react'
import CampaignWrapper from '../../components/campaigns/CampaignWrapper';
import { Divider, makeStyles, Theme, Typography } from '@material-ui/core';
import Resume from '../../components/campaigns/select/Resume';
import AllCampaigns from '../../components/campaigns/select/AllCampaigns';

const useStyles = makeStyles((theme: Theme) => ({
    divider: {
        backgroundColor: theme.palette.common.black + '35',
        marginBottom: theme.spacing(1) + "px",
        marginLeft: theme.spacing(6) + "px",
        marginRight: theme.spacing(6) + "px",
        marginTop: theme.spacing(1.5) + "px"
    },
    container: {
        padding: theme.spacing(1) + "px",
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column'
    }
}));

const CampaignSelect = (props: any) => {
    const { divider, container } = useStyles();

    const lastCampaign = props.campaigns.find(({ _id }) => _id === props.lastCampaignID) || props.campaigns[0];

    return (
        <div className={container}>
            <Resume lastCampaign={lastCampaign} />
            <Divider className={divider} />
            <Typography variant="h4">All Campaigns</Typography>
            <AllCampaigns lastCampaign={lastCampaign} campaigns={props.campaigns} />
        </div>
    )
}

export default CampaignWrapper(CampaignSelect);
