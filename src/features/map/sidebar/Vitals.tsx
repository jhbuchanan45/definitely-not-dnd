import { Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
    vitals: {
        marginLeft: theme.spacing(1),
    }
}))

interface vitalProps {
    curHP: number,
    maxHP: number,
    race: string,
    curStamina?: number,
    maxStamina?: number
}

const Vitals = (props: vitalProps) => {
    const { vitals } = useStyles();
    
    return (
        <Grid className={vitals} item container direction="column" justify="space-evenly" alignItems="flex-start" xs>
            <Grid item>
                <Typography variant="body2">{props.race}</Typography>
            </Grid>
            <Grid item>
                <Typography variant="body2">{props.curHP + " / " + props.maxHP + " HP"}</Typography>
            </Grid>
            <Grid item>
                <Typography variant="body2">{props.curStamina + " / " + props.maxStamina + " SP"}</Typography>
            </Grid>
        </Grid>
    )
}

export default Vitals;
