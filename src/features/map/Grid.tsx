import { makeStyles, Theme } from '@material-ui/core';
import React, { useRef } from 'react';
import Tiles from './Tiles';
import Tokens from './Tokens';
import { connect } from 'react-redux';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { moveMap } from './mapActions';

const useStyles = makeStyles((theme: Theme) => ({
    grid: {
        overflow: "visible",
        position: "absolute",
        boxSizing: "border-box",
        width: (props: any) => { return (props.sqSize * props.grid.width) + "px" },
        height: (props: any) => { return (props.sqSize * props.grid.height) + "px" },
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

    const onMapDragStop = (e: DraggableEvent, data: DraggableData) => {
        props.moveMap({ x: data.x, y: data.y });
    }

    return (
        <Draggable nodeRef={tileRef} handle=".gridTile" defaultPosition={props.grid.pos} onStop={onMapDragStop}>
            <div className={grid} ref={tileRef}>
                <div className={gridInner}>
                    <Tiles />
                    <Tokens />
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
            width: state.map.tiles[0].length,
            pos: { ...state.map.pos },
        },
    }
}

const mapPropsToDispatch = (dispatch: any) => {
    return {
        moveMap: (pos: { x: number, y: number }) => dispatch(moveMap(pos))
    }
}

export default connect(mapStateToProps, mapPropsToDispatch)(Grid);
