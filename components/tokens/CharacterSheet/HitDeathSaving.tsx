import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Token } from '../../../util/TokenParser';

interface Props {
    token: Token,
    update: any
}

const HitDeathSaving = (props: Props) => {
    const HP = props.token.UI.hpParse();

    return (
        <>
            <Grid container alignContent="center" direction="row">
                <Grid style={{height: "100%"}} item sm={6}>
                    <Grid style={{height: "100%"}} container alignItems="center" justify="flex-end" direction="column">
                        <Grid xs item container alignItems="center" justify="center">
                            <Typography variant="h6" align="center">{HP.hitDice.join(" + ")}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography align="center" variant="subtitle2">Hit Dice</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid style={{height: "100%"}} item sm={6}>
                    <Grid style={{height: "100%"}} container alignItems="center" justify="flex-end" direction="column">
                        <Grid xs item container alignItems="center" justify="center">
                            <Typography variant="h4">{"1/3"}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography align="center" variant="subtitle2">Death Saving Throws</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default HitDeathSaving;
