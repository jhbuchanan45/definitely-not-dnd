import { Divider, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
    header: {
        borderBottom: "2px solid " + theme.palette.common.black,
        padding: theme.spacing(0.25, 0.5, 0.25, 0.5)
    }
}))

interface infoHeaderProps {
    name: String,
    level: number,
}

const InfoHeader = (props: infoHeaderProps) => {
    const { header } = useStyles();

    return (
        <Grid className={header} item container direction="row" alignItems="center" justify="space-between">
            <Grid item>
                <Typography variant="body1" >{props.name}</Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" >{"Level " + props.level}</Typography>
            </Grid>
        </Grid>
    )
}

export default InfoHeader;
