import React from 'react';
import {AppBar, makeStyles, Toolbar, Typography, Theme, Button, Container} from '@material-ui/core';
import { Link, Link as RouterLink } from "react-router-dom";
import mainPages from "../common/mainPages";
import { useAuth0 } from "@auth0/auth0-react";
import { updateUser } from '../../redux/user/userSlice';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme: Theme) => ({
    logo: {
        marginRight: theme.spacing(5),
        textDecoration: "none",
    },
    stretchy: {
        flexGrow: 1
    }
}));

const headerData = mainPages;

const Header = () => {
    const { logo, stretchy } = useStyles();
    const dispatch = useDispatch();
    const { loginWithRedirect, isAuthenticated, getAccessTokenSilently, logout } = useAuth0();

    const putUser = async (user) => {
        await getAccessTokenSilently({
          audience: `https://api.definitelynotdnd.com`,
        })
          .then(authJWT => {
            dispatch(updateUser({ authJWT, user: {...user} }))
          })
          .catch(err => {
            console.log(err);
          })
        }

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
                        <div className={stretchy}></div>
                        <Button color="inherit" onClick={() => putUser({lastCampaign: "lol420"})}>Update User</Button>
                        {
                            !isAuthenticated ? 
                                (<Button color="inherit" onClick={() => loginWithRedirect()}>Log In</Button>) :
                                (<Button color="inherit" onClick={() => logout({returnTo: window.location.origin})}>Log out</Button>)
                        }
                    </Toolbar> 
                </Container>
            </AppBar>
            <Toolbar />
        </header>
    )
}

export default Header
