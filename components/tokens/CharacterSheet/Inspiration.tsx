import { Container, Grid, Switch, Typography } from '@material-ui/core';
import React from 'react';

interface Props {
    inspiration: boolean,
    update: any
}

const Inspiration = (props: Props) => {
    return (
        <>
            <Grid container alignItems="center" spacing={1}>
                <Grid item>
                    <Switch checked={props.inspiration} onChange={() => props.update.mutate({ inspiration: !props.inspiration })} />
                </Grid>
                <Grid item>
                    <Typography variant="subtitle2">
                        Inspiration
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default Inspiration;
