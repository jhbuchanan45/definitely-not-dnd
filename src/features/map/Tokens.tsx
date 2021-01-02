import React from 'react';
import { connect } from 'react-redux';

const Tokens = (props: any) => {
    return (
        <div>
            
        </div>
    )
}

const mapStateToProps = state => {
    return {
        tokens: state.map.tokens,
    }
}

export default connect(mapStateToProps, null)(Tokens);
