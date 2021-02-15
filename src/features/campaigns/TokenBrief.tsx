import { Avatar, Card, CardActionArea, CardContent, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles((theme: Theme) => ({
    tokenPaper: {
        backgroundColor: theme.palette.secondary.light,
        boxSizing: "border-box",
        padding: theme.spacing(0.25),
    },
}));

const TokenBrief = (props: any) => {
    const { token, size } = props || { size: '100px' };

    const { tokenPaper } = useStyles();

    return (
        <Card>
            <CardActionArea style={{ height: '100%' }} className={tokenPaper}>
                <CardContent style={{ padding: '0' }}>
                    <Grid container style={{ width: '250px' }} spacing={1}>
                        <Grid item>
                            <Avatar variant="rounded" alt={token?.name} src={token?.image} style={{ width: size, height: size }}></Avatar>
                        </Grid>
                        <Grid item container direction="column" xs>
                            <Grid item>
                                <Typography>{token ? token.name : "No Name"}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography>{token.race ? token.race : "No Race"}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography>{"Level " + (token.stats.level ? token.stats.level : "0")}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default TokenBrief
