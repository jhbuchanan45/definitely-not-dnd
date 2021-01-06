import React from 'react';
import { connect } from 'react-redux';
import Tile from './Tile';
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
        const tileArr: any = [];

        for (let x=0; x < props.tiles.x; x++) {
            tileArr.push((
                <Tile key={x+ "-" + y} x={x} y={y} />
            ))
        }

        return tileArr;
    }

    const renderRows = () => {
        const rows: any[] = [];

        for (let y=0; y < props.tiles.y; y++) {
            rows.push((
                <div key={"row-" + y} className={gridRow}>
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

const mapStateToProps = (state: any) => (
    {
        tiles: {x: state.map.tiles.length, y: state.map.tiles[0].length},
    }
)

export default connect(mapStateToProps, null)(Tiles);
