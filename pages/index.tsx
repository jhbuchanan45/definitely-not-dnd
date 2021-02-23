import { useAuth0 } from '@auth0/auth0-react';
import Head from 'next/head';
import { useQuery } from 'react-query';
import { fetchUser } from '../util/queries/fetch/fetchDefault';


export default function Home() {
  const { getAccessTokenSilently: getAuthToken } = useAuth0();

  const { data: user } = useQuery('user', () => fetchUser(getAuthToken));

  return (
    <div>{JSON.stringify(user)}</div>
  )
}
