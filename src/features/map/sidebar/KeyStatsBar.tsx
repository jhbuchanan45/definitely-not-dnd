import { Avatar, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { keyStats } from '../IMap';

interface KeyStatsProps {
    base: keyStats,
    modifier: keyStats
}



const KeyStatsBar = (props: KeyStatsProps) => {
    return (
        <Grid item container direction="column" alignItems="center" justify="center" spacing={1}>
            <Grid item container direction="row" justify="center" spacing={3}>
                <Grid item>
                    <Avatar alt="Strength">{props.base.STR}</Avatar>
                    <Typography align="center" variant="body2">STR</Typography>
                </Grid>
                <Grid item>
                    <Avatar alt="Knowledge">{props.base.KNW}</Avatar>
                    <Typography align="center" variant="body2">KNW</Typography>
                </Grid>
                <Grid item>
                    <Avatar alt="Finesse">{props.base.FNS}</Avatar>
                    <Typography align="center" variant="body2">FNS</Typography>
                </Grid>
                <Grid item>
                    <Avatar alt="Endurance">{props.base.END}</Avatar>
                    <Typography align="center" variant="body2">END</Typography>
                </Grid>
            </Grid>
            <Grid item container direction="row" justify="center" spacing={3}>
                <Grid item>
                    <Avatar alt="Charisma">{props.base.CHA}</Avatar>
                    <Typography align="center" variant="body2">CHA</Typography>
                </Grid>
                <Grid item>
                    <Avatar alt="Intuition">{props.base.INT}</Avatar>
                    <Typography align="center" variant="body2">INT</Typography>
                </Grid>
                <Grid item>
                    <Avatar alt="Wisdom">{props.base.WIS}</Avatar>
                    <Typography align="center" variant="body2">WIS</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default KeyStatsBar;
