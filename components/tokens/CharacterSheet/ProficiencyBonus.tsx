import { Avatar, Container, Grid, Typography } from '@material-ui/core';
import React from 'react';

interface Props {
    profBonus: any,
    update: any
}

const ProficiencyBonus = (props: Props) => {
    return (
        <>
            <Grid container alignItems="center" spacing={1}>
                <Grid item>
                    <Avatar>{(props.profBonus<0?"":"+") + props.profBonus}</Avatar>
                </Grid>
                <Grid item>
                    <Typography variant="h6">
                        Proficiency Bonus
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default ProficiencyBonus;
