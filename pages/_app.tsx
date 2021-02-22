import { ThemeProvider } from '@material-ui/core';
import React, { useEffect } from 'react';
import '../styles/globals.css';
import mainTheme from '../styles/mainTheme';
import { Auth0Provider, useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import MainWrapper from '../components/MainWrapper';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import AuthCall from '../util/AuthCall';
import fetchUser from '../util/queries/fetchUser';
import QueryWrapper from '../components/QueryWrapper';


function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  Component = withAuthenticationRequired(Component);

  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';

  return (
    <Auth0Provider
      domain="dev-z9ydxjd6.eu.auth0.com"
      clientId="XM47lNMLjVlOwczg9SxK1rtwqtOzjUWa"
      redirectUri={origin}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={mainTheme}>
          <QueryWrapper>
            <MainWrapper>
              <Component {...pageProps} />
            </MainWrapper>
          </QueryWrapper>
        </ThemeProvider>
      </QueryClientProvider>
    </Auth0Provider>
  )
}

export default MyApp;
