import { makeStyles, Theme } from '@material-ui/core';
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
  }))

const Token = (props) => {
    const { token } = useStyles(props);

    const tokenRef = useRef(null);

    const draggableProps = {
        nodeRef: tokenRef,
        // bounds: "makeStyles-map-6",
        defaultPosition: {x: props.token.pos.x*props.sqSize, y: props.token.pos.y*props.sqSize},
        // handle: token,
    }

    return (
        <Draggable {...draggableProps}>
            <div ref={tokenRef} className={token}>
            </div>
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
