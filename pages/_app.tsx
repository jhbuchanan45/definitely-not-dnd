import { ThemeProvider } from '@material-ui/core';
import React, { useEffect } from 'react';
import '../styles/globals.css';
import mainTheme from '../styles/mainTheme';
import { Auth0Provider, withAuthenticationRequired } from '@auth0/auth0-react';
import MainWrapper from '../components/MainWrapper';


function MyApp({ Component, pageProps }) {
  
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, [])

  Component = withAuthenticationRequired(Component);

  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';

  return (
    <Auth0Provider
      domain="dev-z9ydxjd6.eu.auth0.com"
      clientId="XM47lNMLjVlOwczg9SxK1rtwqtOzjUWa"
      redirectUri={origin}
    >
      <ThemeProvider theme={mainTheme}>
        <MainWrapper>
          <Component {...pageProps} />
        </MainWrapper>
      </ThemeProvider>
    </Auth0Provider>
  )
}

export default MyApp;
