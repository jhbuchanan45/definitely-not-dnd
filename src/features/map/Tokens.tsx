import React from 'react';
import { connect } from 'react-redux';
import Token from './Token';

const Tokens = (props: any) => {
    return (
        <>
        {props.tokens.map((id) => {
            return <Token key={id} id={id} />
        })}
        </>
    )
}

const mapStateToProps = state => {
    return {
        tokens: state.map.tokens.map(token => {console.log(token); return (token.id)}),
    }
}

export default connect(mapStateToProps, null)(Tokens);
