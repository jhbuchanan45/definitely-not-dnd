import { makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import {tile} from './IMap';

interface tileProps {
    tile: tile,
    size: number
}

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

const Tile = (props: tileProps) => {
    const { tile } = useStyles(props);

    return (
        <div className={tile + " gridTile"}>
        </div>
    )
}

export default Tile;
