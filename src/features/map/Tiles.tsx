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

    return (
        <>
        {
            props.tiles.map((row: tile[], y:number) => {
                return (
                    <div className={gridRow}>
                    {
                        row.map((tile: tile, x: number) => {
                            return (<Tile tile={tile} key={x+"-"+y} size={props.sqSize} />)
                        })
                    }
                    </div>
                    )
                }
            )
        }
        </>
    )
}

const mapStateToProps = state => {
    return {
        tiles: state.map.tiles,
        sqSize: state.map.sqSize
    }
}

export default connect(mapStateToProps, null)(Tiles);
