import React from 'react';
import {AppBar, makeStyles, Toolbar, Typography, Theme, Button, Container} from '@material-ui/core';
import { Link, Link as RouterLink } from "react-router-dom";
import mainPages from "../common/mainPages";
import { useAuth0 } from "@auth0/auth0-react";

const useStyles = makeStyles((theme: Theme) => ({
    logo: {
        marginRight: theme.spacing(5),
        textDecoration: "none",
    }
}));

const headerData = mainPages;

const Header = () => {
    const { logo } = useStyles();
    const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

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
                        <Typography variant="h5" className={logo} component={Link} to={"/"} color="inherit">Definitely Not DND</Typography>
                        {getMenuButtons()} 
                        {
                            !isAuthenticated ? 
                                (<button onClick={() => loginWithRedirect()}>Log In</button>) :
                                (<button onClick={() => logout({returnTo: window.location.origin})}>Log out</button>)
                        }
                    </Toolbar> 
                </Container>
            </AppBar>
            <Toolbar />
        </header>
    )
}

export default Header
