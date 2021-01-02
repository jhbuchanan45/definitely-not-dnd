import { makeStyles, Theme, Tooltip } from '@material-ui/core';
import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';
import { token } from './IMap';

const useStyles = makeStyles((theme: Theme) => ({
    token: (props: any) => {
        return {
            width: props.token.size + "px",
            height: props.token.size + "px",
            background: "blue",
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

    const draggableProps = {
        nodeRef: tokenRef,
        defaultPosition: {x: props.token.pos.x*props.sqSize, y: props.token.pos.y*props.sqSize},
        // handle: token,
    }

    return (
        <Draggable {...draggableProps}>
            <Tooltip title={props.token.name} aria-label="add" arrow classes={{tooltip, arrow, tooltipPlacementBottom}}>
                <div ref={tokenRef} className={token}>
                </div>
            </Tooltip>
        </Draggable>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.map.tokens.find((token: token) => (token.id === ownProps.id)),
        sqSize: state.map.sqSize
    }
}

export default connect(mapStateToProps, null)(Token);
