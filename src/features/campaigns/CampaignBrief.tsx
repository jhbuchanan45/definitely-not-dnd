import { Card, CardActionArea, CardContent, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux'
import Campaign from '../../redux/campaign/campaign';
import { selectCampaignByID } from '../../redux/campaign/campaignSlice';

const useStyles = makeStyles((theme: Theme) => ({
    brief: (campaign: Campaign) => ({
        width: "400px",
        height: "250px",
        backgroundColor: 'lightblue',
        backgroundImage: `url(${campaign?.image})`,
        WebkitBackgroundSize: 'auto 300px',
        backgroundSize: 'auto 300px',
        backgroundPosition: 'center',
        position: 'relative'
    }),
    titleBar: {
        position: 'absolute',
        bottom: '0',
        width: '100%',
        padding: theme.spacing(1) + 'px',
        boxSizing: 'border-box',
        zIndex: 1,
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0,0.3)',
        backdropFilter: 'blur(2px)'
    },
    title: {
        color: '#FFF',
        textAlign: 'right',
        textShadow: '-0.5px 0.5px 2px #000, 0.5px 0.5px 2px #000, 0.5px -0.5px 0 #000, -0.5px -0.5px 0 #000'
    }
}));


interface Props {
    campaignId: String
}

const CampaignBrief = (props: Props) => {
    const campaign = useSelector(state => selectCampaignByID(state, props.campaignId))
    const { brief, titleBar, title } = useStyles(campaign);

    const briefContents = () => {
        return (
        <CardActionArea style={{ height: '100%' }} component={RouterLink} to={`/campaigns/${campaign?._id}`} >
            <CardContent style={{ padding: '0' }}>
                <div className={titleBar}>
                    <Typography className={title} variant="h5">{campaign?.name}</Typography>
                </div>
            </CardContent>
        </CardActionArea>)
    }

    return (
        <Card className={brief}>
            {briefContents()}
        </Card>
    )
}

export default CampaignBrief
