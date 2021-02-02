import { Divider, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import AllCampaigns from './AllCampaigns';
import Resume from './Resume';

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

const CampaignSelect = () => {
    const { divider, container } = useStyles();

    return (
        <div className={container}>
            <Resume />
            <Divider className={divider} />
            <Typography variant="h4">All Campaigns</Typography>
            <AllCampaigns />
        </div>
    )
}

export default CampaignSelect;
