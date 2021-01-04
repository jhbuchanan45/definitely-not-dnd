import React from 'react';
import Grid from './Grid';
import Sidebar from './sidebar/Sidebar';
import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    map: {
        overflow: "hidden",
        height: "100%",
        width: "100%",
        position: "relative",
    }
  }))

const Map = () => {
    const { map } = useStyles();

    return (
        <div className={map}>
            <Grid />
            <Sidebar />
        </div>
    )
}

export default Map;
