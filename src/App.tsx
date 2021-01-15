import React from 'react';
import { Route } from 'react-router-dom';
import Header from './features/header/Header';
import { Container, Paper, Theme, makeStyles } from '@material-ui/core';
import mainPages from "./features/common/mainPages";
import Greeting from './features/greeting/Greeting';
import { useAuth0 } from "@auth0/auth0-react";


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
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (<div>Loading...</div>)
  }

  return (
    <div className={screen}>
      <Header />
      <Container maxWidth={false} disableGutters={true} className={bgContainer}>
        <Container maxWidth="xl" className={innerContainer}>
          <Paper elevation={1} className={fullHeight}>
            {
              mainPages.map(({ href, component }) => {
                return <Route key={href} path={href} component={component} />
              })
            }
            <Route exact path="/" component={Greeting} />
          </Paper>
        </Container>
      </Container>
    </div>
  );
}

export default App;
