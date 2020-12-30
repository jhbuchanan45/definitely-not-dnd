import React from 'react';
import {AppBar, makeStyles, Toolbar, Typography, Theme, Button, Container} from '@material-ui/core';
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
    header: {
        backgroundColor: theme.palette.primary.main,
    }
}))

const headerData = [
    {
        label: "Map",
        href: "/map",
    },
    {
        label: "Characters",
        href: "/characters",
    },
    {
        label: "Campaigns",
        href: "/campaigns",
    },
    {
        label: "Monsters",
        href: "/monsters",
    }
]

const Header = () => {

    const getMenuButtons = () => {
        return headerData.map(({label, href}) => {
            return (
                <Button 
                    {...{
                        key: label,
                        color: "inherit",
                        to: href,
                        component: RouterLink,
                    }}
                >
                    {label}
                </Button>
            )
        });
    };

    return (
        <header>
            <AppBar>
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography variant="h6">Definitely Not DND</Typography>
                        {getMenuButtons()}    
                    </Toolbar> 
                </Container>
            </AppBar>
            <Toolbar />
        </header>
    )
}

export default Header
