import { Card, CardActionArea, CardContent, makeStyles, Theme, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
    brief: (map: any) => ({
        width: "370px",
        height: "230px",
        maxHeight: '230px',
        backgroundColor: 'lightblue',
        backgroundImage: `url(${map?.image})`,
        WebkitBackgroundSize: 'auto 245px',
        backgroundSize: 'auto 245px',
        backgroundPosition: 'center',
        position: 'relative',
        boxSizing: 'border-box'
    }),
    titleBar: {
        position: 'absolute',
        bottom: '0',
        width: '100%',
        padding: theme.spacing(1) + 'px',
        boxSizing: 'border-box',
    },
    title: {
        color: '#FFF',
        textAlign: 'right',
        textShadow: '-0.5px 0.5px 2px #000, 0.5px 0.5px 2px #000, 0.5px -0.5px 0 #000, -0.5px -0.5px 0 #000'
    }
}
));

const MapBrief = (props: any) => {
    const {map} = props;

    const { brief, title, titleBar } = useStyles(map);

    return (
            <Card className={brief}>
                <CardActionArea style={{ height: '100%' }} component={RouterLink} to={`/campaigns/${map.campaignId}/maps/${map._id}`}>
                    <CardContent style={{ padding: '0' }}>
                        <div className={titleBar}>
                            <Typography className={title} variant="h5">{map ? map.name : "Map"}</Typography>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
    )
}

export default MapBrief;
