import { makeStyles, Theme } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
    sidebar: {
        position: "absolute",
        right: "10px",
        top: "0px"
    }
  }))

const Sidebar = () => {
    const { sidebar } = useStyles();

    return (
        <div className={sidebar}>
            SIDEBAR!
        </div>
    )
}

export default Sidebar;
