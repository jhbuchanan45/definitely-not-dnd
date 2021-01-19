import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import Header from './features/header/Header';
import { Container, Paper, Theme, makeStyles } from '@material-ui/core';
import mainPages from "./features/common/mainPages";
import Greeting from './features/greeting/Greeting';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import LoadingSpinner from './features/common/loadingSpinner';

const ProtectedRoute = ({ component, ...args }) => (
  <Route component={withAuthenticationRequired(component)} {...args} />
);

const useStyles = makeStyles((theme: Theme) => ({
  bgContainer: {
    backgroundColor: theme.palette.secondary.dark,
    height: "100%",
  },
  innerContainer: {
    height: "100%",
    paddingTop: theme.spacing(2) + "px",
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

const App = () => {
  const { bgContainer, innerContainer, screen, fullHeight } = useStyles();
  const { isLoading, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getUserMetadata = async () => {

      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://api.definitelynotdnd.com`,
        });

        const userDetailsByIdUrl = `${process.env.REACT_APP_API_DOMAIN}/token`;

        const testNewToken = await fetch(userDetailsByIdUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            token: {
              "image": "https://static.wikia.nocookie.net/halo/images/a/a9/H5G_Render_John117-Profile.png",
              "name": "John",
              "race": "Human",
              "stats": {
                "level": 3,
                "key": {
                  "base": {
                    "STR": 20,
                    "END": 16,
                    "CHA": 9,
                    "FNS": 10,
                    "KNW": 12,
                    "WIS": 10,
                    "INT": 14
                  },
                  "modifier": {
                    "STR": 5,
                    "END": 2,
                    "CHA": 2,
                    "FNS": 2,
                    "KNW": 0,
                    "WIS": 2,
                    "INT": 2
                  }
                },
                "alt": {
                  "dge": 3,
                  "bHP": 10,
                  "arm": 21
                },
                "resist": {
                  "phy": 10,
                  "rng": 10,
                  "mag": 5
                }
              },
              "status": {
                "cHP": 10,
                "mHP": 18,
                "cStm": 5,
                "mStm": 5
              },
              "pos": {
                "x": 3,
                "y": 5
              },
              "size": 25
            }
          })
        })

        // console.log(await testNewToken.json());

        const getTokens = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const userMetadataTest = await getTokens.json();

        console.log(userMetadataTest);

        //   setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, []);

  if (isLoading) {
    return (<LoadingSpinner />)
  }

  return (
    <div className={screen}>
      <Header />
      <Container maxWidth={false} disableGutters={true} className={bgContainer}>
        <Container maxWidth="xl" className={innerContainer}>
          <Paper elevation={1} className={fullHeight}>
            {
              mainPages.map(({ href, component }) => {
                return <ProtectedRoute key={href} path={href} component={component} />
              })
            }
            <ProtectedRoute exact path="/" component={Greeting} />
          </Paper>
        </Container>
      </Container>
    </div>
  );
}

export default App;
