import { makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import {tile} from './IMap';

const useStyles = makeStyles((theme: Theme) => ({
    tile: (props: any) => {
        return {
            float: "left",
            padding: "0px",
            boxSizing: "border-box",
            width: (props.size + "px"),
            height: (props.size + "px"),
            background: ("rgba(" + props.tile.bgColour + "," + props.tile.bgOpacity + ")"),
            border: "1px solid" + props.tile.bdColour,
        }
    },
  }))

const Tile = (props: any) => {
    const { tile } = useStyles(props);

    return (
        <div className={tile + " gridTile"}>
        </div>
    )
}

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        tile: state.map.tiles[ownProps.y][ownProps.x],
        size: state.map.sqSize
    }
}

export default connect(mapStateToProps, null)(Tile);
