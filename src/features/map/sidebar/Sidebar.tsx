import { Avatar, Divider, Grid, makeStyles, Paper, Theme } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { token } from '../IMap';
import InfoHeader from './InfoHeader';
import KeyStatsBar from './KeyStatsBar';
import SidebarHeader from './SidebarHeader'
import Vitals from './Vitals';

const useStyles = makeStyles((theme: Theme) => ({
    sidebar: (props: any) => {
        if (props.expanded) {
            return {
                position: "absolute",
                right: "10px",
                top: "0px",
                maxWidth: "250px",
                minWidth: "250px",
                maxHeight: "500px",
                minHeight: "250px",
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
    grid: {
        padding: theme.spacing(0.6),
    },
    avatar: {
        width: theme.spacing(16),
        height: theme.spacing(16),
    },
}))


const Sidebar = (props: any) => {
    const { sidebar, grid, avatar } = useStyles(props);
    const token: token = props.selectedToken; 
    
    const vitalProps = {
        curHP: token.status.cHP,
        maxHP: token.status.mHP,
        race: token.race,
        curStamina: token.status.cStm,
        maxStamina: token.status.mStm
    }
    
    return (
        <Paper elevation={4} className={sidebar}>
            <SidebarHeader expanded={props.expanded} />
            {props.expanded ? (
                <Grid className={grid} container direction="column" alignItems="flex-start" alignContent="center" justify="center" spacing={1}>
                        <InfoHeader name={props.selectedToken.name} level={props.selectedToken.stats.level} />
                        <Grid item container direction="row" alignContent="flex-end">
                            <Vitals {...vitalProps} />
                            <Grid item xs={6} alignContent="flex-end">
                                <Avatar variant="rounded" alt={token.name} src={token.image} className={avatar} imgProps={{style: {objectFit: "contain"}}}>{token.name.charAt(0)}</Avatar>
                            </Grid>
                        </Grid>
                        <KeyStatsBar {...token.stats.key} />
                </Grid>
            ) : null}
        </Paper>
    )
}

const mapStateToProps = (state: any) => ({
    selectedToken: state.map.selectedToken,
    expanded: state.map.sidebarExpanded,
})

export default connect(mapStateToProps, null)(Sidebar);
