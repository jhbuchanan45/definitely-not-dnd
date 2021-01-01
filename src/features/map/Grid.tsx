import { Hidden, makeStyles, Theme } from '@material-ui/core';
import React, { useRef } from 'react';
import Tiles from './Tiles';
import Tokens from './Tokens';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';

const useStyles = makeStyles((theme: Theme) => ({
    grid: {
        overflow: "hidden",
        position: "absolute",
        boxSizing: "border-box",
        width: (props: any) => {return (props.sqSize * props.grid.width) + "px"},
        height: (props: any) => {return (props.sqSize * props.grid.height) + "px"},
    },
    gridInner: {
        position: "relative",
        width: "100%",
        height: "100%"
    }
  }))

const Grid = (props: any) => {
    const { grid, gridInner } = useStyles(props);

    const tileRef = useRef(null);
    
    return (
        <Draggable nodeRef={tileRef} handle=".gridTile">
            <div className={grid} ref={tileRef}>
                <div className={gridInner}>
                    <Tiles />
                </div>
            </div>
        </Draggable>
    )
}

const mapStateToProps = state => {
    return {
        sqSize: state.map.sqSize,
        grid: {
            height: state.map.tiles.length,
            width: state.map.tiles[0].length
        }
    }
}

export default connect(mapStateToProps, null)(Grid);
