import { Card, CardActionArea, CardContent, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react'
import Link from 'next/link';

const useStyles = makeStyles((theme: Theme) => ({
    brief: (campaign: any) => ({
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
    campaign: any
}

const CampaignBrief = (props: Props) => {
    const campaign = props.campaign;
    const { brief, titleBar, title } = useStyles(campaign);

    const briefContents = () => {
        return (
            <Link href={`/campaigns/${campaign._id}`}>
                <CardActionArea style={{ height: '100%' }}>
                    <CardContent style={{ padding: '0' }}>
                        <div className={titleBar}>
                            <Typography className={title} variant="h5">{campaign.name}</Typography>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Link>
        )
    }

    return (
        <Card className={brief} elevation={3}>
            {briefContents()}
        </Card>
    )
}

export default CampaignBrief;
