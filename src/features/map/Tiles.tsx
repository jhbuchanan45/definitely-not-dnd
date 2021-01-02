import React from 'react';
import { connect } from 'react-redux';
import Tile from './Tile';
import { tile } from './IMap';
import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    gridRow: {
        '&:after': {
            clear: "both",
            content: "both",
            display: "table"
        }
    },
  }))

const Tiles = (props: any) => {
    const {gridRow} = useStyles();

    const renderTiles = (y: number) => {
        const tiles = Array();

        for (let x=0; x < props.tiles.x; x++) {
            tiles.push((
                <Tile x={x} y={y} />
            ))
        }

        return tiles;
    }

    const renderRows = () => {
        const rows = Array();

        for (let y=0; y < props.tiles.y; y++) {
            rows.push((
                <div className={gridRow}>
                    {renderTiles(y)}
                </div>
            ))
        }

        return rows;
    }

    return (
        <>
        {renderRows()}
        </>
    )
}

const mapStateToProps = state => {
    return {
        tiles: {x: state.map.tiles.length, y: state.map.tiles[0].length},
    }
}

export default connect(mapStateToProps, null)(Tiles);
