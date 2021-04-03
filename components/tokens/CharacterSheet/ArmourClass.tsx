import { Avatar, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Token } from '../../../util/TokenParser';

interface Props {
    token: Token,
    update: any
}

const ArmourClass = (props: Props) => {
    return (
        <>
            <Grid container direction="column" >
                <Grid item>
                    <Avatar>
                        {}
                    </Avatar>
                </Grid>
                <Grid item>
                    <Typography variant="h6">
                        Armour Class
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default ArmourClass;
