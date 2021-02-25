import React from 'react';
import {AppBar, makeStyles, Toolbar, Typography, Theme, Button, Container} from '@material-ui/core';
import { useAuth0 } from "@auth0/auth0-react";
import Link from 'next/link';

const useStyles = makeStyles((theme: Theme) => ({
    logo: {
        marginRight: theme.spacing(5),
        textDecoration: "none",
    },
    stretchy: {
        flexGrow: 1
    }
}));

const Header = () => {
    const { logo, stretchy } = useStyles();

    const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

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

    const getMenuButtons = () => {
        return headerData.map(({label, href}) => {
            return (<Link href={href} key={label}><Button color="inherit">{label}</Button></Link>)
        })
    };

    // temp for dev
    const make3Campaigns = () => {
        const campaigns = [
            {
                name: "Hoard of the Ice Queen",
                image: "https://media-waterdeep.cursecdn.com/attachments/6/718/cover4k.jpg"               
            },
            {
                name: "Curse of Strahd",
                image: "https://media-waterdeep.cursecdn.com/attachments/8/220/cos-cover-4k.jpg"
            },
            {
                name: "Storm King's Thunder",
                image: "https://media-waterdeep.cursecdn.com/attachments/2/734/sktcover.png"
            }
        ]

    }

    return (
        <header>
            <AppBar>
                <Container maxWidth="xl">
                    <Toolbar>
                        <Link href="/"><Typography variant="h5" className={logo} color="inherit">Definitely Not DND</Typography></Link>
                        {getMenuButtons()} 
                        <div className={stretchy}></div>
                        {
                            !isAuthenticated ? 
                                (<Button color="inherit" onClick={() => loginWithRedirect()}>Log In</Button>) :
                                (<Button color="inherit" onClick={() => logout({returnTo: "window.location.origin"})}>Log out</Button>)
                        }
                    </Toolbar> 
                </Container>
            </AppBar>
            <Toolbar />
        </header>
    )
}

export default Header
