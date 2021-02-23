import { ThemeProvider } from '@material-ui/core';
import React, { useEffect } from 'react';
import '../styles/globals.css';
import mainTheme from '../styles/mainTheme';
import { Auth0Provider, useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import MainWrapper from '../components/MainWrapper';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import QueryWrapper from '../components/QueryWrapper';
import LoadingSpinner from '../components/LoadingSpinner';

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();

  // for flicker removing (load styles on server generation then switch to client on load)
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
            <LoadingPage>
              <MainWrapper>
                <Component {...pageProps} />
              </MainWrapper>
            </LoadingPage>
          </QueryWrapper>
        </ThemeProvider>
      </QueryClientProvider>
    </Auth0Provider>
  )
}

const LoadingPage = (props: any) => {
  const { isLoading } = useAuth0();

  return (
    <>
      { isLoading
        ? <LoadingSpinner />
        : props.children
      }
    </>
  )
}

export default MyApp;
