import { Grid, Icon, IconButton, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import { DoubleArrowRounded, Launch } from '@material-ui/icons'
import { connect } from 'react-redux';
import { toggleSidebar } from '../../../redux/map/mapActions';

interface sidebarProps {
    expanded: boolean,
    toggleVisibility: any
}

const useStyles = makeStyles((theme: Theme) => ({
    header: {
        backgroundColor: theme.palette.primary.dark,
    },
    iconButton: {
        borderRadius: theme.shape.borderRadius,
        margin: "2px",
        padding: "1px",
        transition: "transform 0.1s"
    },
    closedButton: {
        transform: "rotate(180deg)",
    },
    expandedButton: {
        transform: "rotate(0)"
    }
}))

const SidebarHeader = (props: sidebarProps) => {
    const { header, iconButton, expandedButton, closedButton } = useStyles();

    const headerType = () => {
        return (
            <Grid className={header} container direction="row" alignItems="center" justify="space-between">
                <Grid item>
                    <IconButton disableRipple className={iconButton + " " + (props.expanded ? expandedButton : closedButton)} onClick={() => {props.toggleVisibility() }} size="small">
                        <DoubleArrowRounded fontSize="small" color="action" />
                    </IconButton>
                </Grid>
                {
                    props.expanded ? (<Grid item>
                        <IconButton className={iconButton} size="small">
                            <Launch fontSize="small" color="action" />
                        </IconButton>
                    </Grid>) : null
                }
            </Grid>
        )
    }

    return (
        <>
            {headerType()}
        </>
    )
}

const mapDispatchToProps = (dispatch: any) => ({
    toggleVisibility: () => dispatch(toggleSidebar()),
})

export default connect(null, mapDispatchToProps)(SidebarHeader);
