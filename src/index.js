import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import 'normalize.css';
import { GlobalStyles } from './global-styles';
import App from './app';
import Firebase from './firebase/firebase.prod';
import FirebaseContext from './context/firebase';
import configureStore, { history } from './configureStore';

import './assets/vendor/nucleo/css/nucleo.css';
import './assets/vendor/font-awesome/css/font-awesome.min.css';
import './assets/scss/argon-design-system-react.scss';
import './assets/scss/argon-dashboard-react.scss';

export const myStore = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={new Firebase()}>
      <GlobalStyles />
      <Provider store={myStore}>
        <ConnectedRouter history={history}>
          <App dispatch={myStore.dispatch} />
        </ConnectedRouter>
      </Provider>
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
