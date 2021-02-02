import { Avatar, Grid, Typography } from '@material-ui/core';
import React from 'react'

const TokenBrief = (props: any) => {
    const { token, size } = props || {size: '100px'};

    return (
        <Grid container style={{width: '250px'}} spacing={1}>
            <Grid item>
                <Avatar variant="rounded" alt={token?.name} src={token?.image} style={{width: size, height: size}}></Avatar>
            </Grid>
            <Grid item container direction="column" xs>
                <Grid item>
                    <Typography>Name</Typography>
                </Grid>
                <Grid item>
                    <Typography>Race Class</Typography>
                </Grid>
                <Grid item>
                    <Typography>Level 1</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default TokenBrief
