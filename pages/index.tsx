import { useAuth0 } from '@auth0/auth0-react';
import Head from 'next/head';
import { useSnackbar } from 'notistack';
import { useQuery } from 'react-query';
import { useUser } from '../util/queries/fetch/fetchDefault';

export default function Home() {
  const { getAccessTokenSilently: getAuthToken } = useAuth0();
  const { enqueueSnackbar } = useSnackbar();

  const { data: user } = useUser(getAuthToken, useQuery, enqueueSnackbar);

  return (
    <div>{JSON.stringify(user)}</div>
  )
}
