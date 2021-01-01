import React from 'react';
import {AppBar, makeStyles, Toolbar, Typography, Theme, Button, Container} from '@material-ui/core';
import { Link, Link as RouterLink } from "react-router-dom";
import mainPages from "../common/mainPages";

const useStyles = makeStyles((theme: Theme) => ({
    logo: {
        marginRight: theme.spacing(5),
        textDecoration: "none",
    }
}));

const headerData = mainPages
const Header = () => {
    const { logo } = useStyles();

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
                    </Toolbar> 
                </Container>
            </AppBar>
            <Toolbar />
        </header>
    )
}

export default Header
