import { useAuth0 } from '@auth0/auth0-react';
import React, { createContext } from 'react'
import { useQuery } from 'react-query';
import AuthCall from '../util/AuthCall';
import fetchUser from '../util/queries/fetchUser';

export const userContext = createContext({});

const QueryWrapper = (props: any) => {
    const { getAccessTokenSilently } = useAuth0();

    const { data } = useQuery('user', () => AuthCall(getAccessTokenSilently, {}, fetchUser));

    return (
        <userContext.Provider value={data}>
            {props.children}
        </userContext.Provider>
    )
}

export default QueryWrapper

