import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import Header from './features/header/Header';
import { Container, Paper, Theme, makeStyles } from '@material-ui/core';
import mainPages from "./features/common/mainPages";
import Greeting from './features/greeting/Greeting';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import LoadingSpinner from './features/common/loadingSpinner';
import NotAuthenticated from './features/common/NotAuthenticated';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './redux/user/userSlice';

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

const App = () => {
  const { bgContainer, innerContainer, screen, fullHeight } = useStyles();

  // used to get user details to hydrate state
  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await getAccessTokenSilently({
        audience: `https://api.definitelynotdnd.com`,
      })
        .then(authJWT => {
          dispatch(fetchUser({ authJWT }))
        })
        .catch(err => {
          console.log(err);
        })

    })();
  }, []);

  if (isLoading) {
    return (<LoadingSpinner />)
  }

  return (
    <div className={screen}>
      <Header />
      <Container maxWidth={false} disableGutters={true} className={bgContainer}>
        <Container maxWidth="xl" className={innerContainer}>
          {isAuthenticated
            ?
            <Paper elevation={1} className={fullHeight}>
              {
                mainPages.map(({ href, component }) => {
                  return <ProtectedRoute key={href} path={href} component={component} />
                })
              }
              <ProtectedRoute exact path="/" component={Greeting} />
            </Paper>
            : <ProtectedRoute path="/" component={NotAuthenticated}></ProtectedRoute>
          }
        </Container>
      </Container>
    </div>
  );
}

export default App;
