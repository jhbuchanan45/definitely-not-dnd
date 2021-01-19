import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from '@material-ui/core/styles';
import mainTheme from './style/mainTheme';
import { BrowserRouter as Router } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="dev-z9ydxjd6.eu.auth0.com"
    clientId="XM47lNMLjVlOwczg9SxK1rtwqtOzjUWa"
    redirectUri={window.location.origin}
  >
    <React.StrictMode>
      <Router>
        <Provider store={store}>
          <ThemeProvider theme={mainTheme}>
            <App />
          </ThemeProvider>
        </Provider>
      </Router>
    </React.StrictMode>
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
