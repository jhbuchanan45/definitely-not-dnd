import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Token } from '../../../util/TokenParser';

interface Props {
    token: Token,
    update: any
}

const HP = (props: Props) => {
    const HP = props.token.UI.hpParse();

    console.log(HP)

    return (
        <>
            <Grid container alignContent="center" direction="row">
                <Grid style={{height: "100%"}} item sm={8}>
                    <Grid style={{height: "100%"}} container alignItems="center" justify="flex-end" direction="column">
                        <Grid xs item container alignItems="center" justify="center">
                            <Typography variant="h4">{HP.cHP + " / " + HP.mHP}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography align="center" variant="subtitle2">Current Hit Points</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid style={{height: "100%"}} item sm={4}>
                    <Grid style={{height: "100%"}} container alignItems="center" justify="flex-end" direction="column">
                        <Grid xs item container alignItems="center" justify="center">
                            <Typography variant="h4">{HP.tHP}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography align="center" variant="subtitle2">Temporary</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default HP;
