import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './features/header/Header';
import Map from './features/map/Map';
import Campaigns from './features/campaigns/Campaigns';
import Characters from './features/characters/Characters';
import Monsters from './features/monsters/Monsters';
import { Container, Paper, Theme, makeStyles } from '@material-ui/core';

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

  return ( 
      <div className={screen}>
        <Header />
        <Container maxWidth={false} disableGutters={true} className={bgContainer}>
          <Container maxWidth="xl" className={innerContainer}>
            <Paper elevation={1} className={fullHeight}>
              <Route path="/map" component={Map} />
              <Route path="/campaigns" component={Campaigns} />
              <Route path="/characters" component={Characters} />
              <Route path="/monsters" component={Monsters} />
            </Paper>
          </Container>
        </Container>
      </div>
  );
}

export default App;
