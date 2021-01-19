import React from 'react';
import {FadeLoader} from 'react-spinners';

const loadingSpinner = (props: any) => {
    return (
        <FadeLoader {...props} />
    )
}

export default loadingSpinner;
