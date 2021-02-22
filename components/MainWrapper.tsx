import { Container, makeStyles, Paper, Theme } from '@material-ui/core';
import React, { Component } from 'react';
import Header from './Header';

const useStyles = makeStyles((theme: Theme) => ({
    bgContainer: {
        backgroundColor: theme.palette.secondary.dark,
        height: "100%",
    },
    innerContainer: {
        height: "100%",
        paddingTop: theme.spacing(1) + "px",
        paddingBottom: theme.spacing(1) + "px",
    },
    screen: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    fullHeight: {
        height: "100%",
    }
}))

const MainWrapper = (props: any) => {
    const { bgContainer, innerContainer, screen, fullHeight } = useStyles();

    return (
        <div className={screen}>
            <Header />
            <Container maxWidth={false} disableGutters={true} className={bgContainer}>
                <Container maxWidth="xl" className={innerContainer}>
                    <Paper elevation={1} className={fullHeight}>
                        {props.children}
                    </Paper>
                </Container>
            </Container>
        </div>
    )
}

export default MainWrapper;
