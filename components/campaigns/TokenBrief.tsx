import { Avatar, Card, CardActionArea, CardContent, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import Link from 'next/link';
import React from 'react'

const useStyles = makeStyles((theme: Theme) => ({
    tokenPaper: {
        backgroundColor: theme.palette.secondary.light,
        boxSizing: "border-box",
        padding: theme.spacing(0.25),
    },
}));

interface Props {
    token: any,
    size?: string,
    variant: "players" | "tokens"
}

const TokenBrief = (props: Props) => {
    const { token, size, variant } = props || { size: '100px' };

    const { tokenPaper } = useStyles();

    const getLevel = (classes: any[]) => {
        let tLevel = 0;
        classes.forEach(({level}) => {
            tLevel+= level;
        })

        return tLevel;
    }

    return (
        <Card>
            <Link href={`/campaigns/${token.campaignId}/${variant}/${token._id}`}>
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
                                    <Typography>{"Level " + (getLevel(token.classes))}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card>
    )
}

export default TokenBrief
