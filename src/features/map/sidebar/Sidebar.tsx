import { makeStyles, Paper, Theme } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import SidebarHeader from './SidebarHeader'

const useStyles = makeStyles((theme: Theme) => ({
    sidebar: (props: any) => {
        if (props.expanded) {
            return {
                position: "absolute",
                right: "10px",
                top: "0px",
                maxWidth: "300px",
                minWidth: "300px",
                maxHeight: "500px",
                minHeight: "450px",
                margin: "10px 0",
                boxSizing: "border-box",
                backgroundColor: theme.palette.info.light,
                transition: "0.2s"
            }
        } else {
            return {
                position: "absolute",
                right: "0px",
                top: "0px",
                margin: "10px 0",
                minWidth: "0",
                minHeight: "0",
                boxSizing: "border-box",
                transition: "0.2s"
            }
        }
    },
  }))

const Sidebar = (props: any) => {
    const { sidebar } = useStyles(props);

    return (
        <Paper elevation={4} className={sidebar}>
            <SidebarHeader />
        </Paper>
    )
}

const mapStateToProps = (state) => ({
    selectedToken: state.map.selectedToken,
    expanded: state.map.sidebarExpanded,
})

export default connect(mapStateToProps, null)(Sidebar);
