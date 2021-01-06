import { makeStyles, Theme, Tooltip } from '@material-ui/core';
import React, { useRef } from 'react';
import Draggable, { DraggableData, DraggableEvent, DraggableEventHandler } from 'react-draggable';
import { connect } from 'react-redux';
import { token } from './IMap';
import { moveToken, selectToken } from './mapActions';

// TODO - Add asynchronously loading thumbnail images for tokens

const useStyles = makeStyles((theme: Theme) => ({
    token: (props: any) => {
        return {
            width: props.token.size + "px",
            height: props.token.size + "px",
            background: "lightblue url(" + props.token.image + ") no-repeat center 0px/" + props.token.size + "px",
            border: "2px solid grey",
            position: "absolute",
            left: "0px",
            top: "0px",
            boxSizing: "border-box",
            cursor: "pointer"
        }
    },
    tooltip: {
        backgroundColor: theme.palette.primary.dark,
        opacity: 1,
        color: theme.palette.text.secondary,
        padding: "1px 5px"
    },
    tooltipPlacementBottom: {
        margin: "6px 0",
    },
    arrow: {
        color: theme.palette.primary.dark,
        opacity: 1
    }
  }))

const Token = (props) => {
    const { token, tooltip, arrow, tooltipPlacementBottom } = useStyles(props);

    const tokenRef = useRef(null);

    const onDragStop:DraggableEventHandler = (e: DraggableEvent, data: DraggableData) => {
        props.moveToken(props.token, {x: data.x/props.sqSize, y: data.y/props.sqSize})
    }

    const draggableProps = {
        nodeRef: tokenRef,
        defaultPosition: {x: props.token.pos.x*props.sqSize, y: props.token.pos.y*props.sqSize},
        // handle: token,
        // onClick: props.selectToken(props.token),
        onStop: onDragStop,
    }

    return (
        <Draggable {...draggableProps}>
            <Tooltip title={props.token.name} aria-label="add" arrow classes={{tooltip, arrow, tooltipPlacementBottom}}>
                <div ref={tokenRef} className={token} onClick={() => {props.selectToken(props.token)}}>
                </div>
            </Tooltip>
        </Draggable>
    )
}

const mapStateToProps = (state:any, ownProps:any) => {
    return {
        token: state.map.tokens.find((token: token) => (token.id === ownProps.id)),
        sqSize: state.map.sqSize
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        selectToken: (token: token) => dispatch(selectToken(token)),
        moveToken: (token: token, pos: {x:number, y:number}) => dispatch(moveToken(token, pos))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Token);
