import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import {ThemeProvider} from '@material-ui/core/styles';
import mainTheme from './style/mainTheme';
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <ThemeProvider theme={mainTheme}>
          <App />
        </ThemeProvider>
      </Provider>
    </Router>  
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
