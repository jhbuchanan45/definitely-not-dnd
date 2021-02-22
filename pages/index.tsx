import Head from 'next/head';
import { useContext } from 'react';
import { userContext } from '../components/QueryWrapper';


export default function Home() {
  const user = useContext(userContext);

  return (
    <div>{JSON.stringify(user)}</div>
  )
}
