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
            <Grid container alignItems="center" justify="center" direction="column">
                <Grid xs item container alignItems="center" justify="center">
                    <Avatar style={{ width: "60px", height: "60px" }}>
                        <Typography variant="h4">{props.token.UI.armourClassParse().total}</Typography>
                    </Avatar>
                </Grid>
                <Grid item>
                    <Typography align="center" variant="subtitle2">
                        Armour Class
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default ArmourClass;
