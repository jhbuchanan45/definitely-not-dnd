import React from 'react';
import {FadeLoader} from 'react-spinners';

const LoadingSpinner = (props: any) => {
    return (
        <FadeLoader {...props} />
    )
}

export default LoadingSpinner;
