import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { HomePage, SigninPage, RegisterProspectPage } from './pages';
import * as ROUTES from './constants/routes';
import { UnProtectedRoute } from './helpers/routes';

function App(props) {
  const { dispatch } = props;
  return (
    <Router>
      <Switch>
        <UnProtectedRoute path={ROUTES.HOME}>
          <RegisterProspectPage dispatch={dispatch} />
        </UnProtectedRoute>
        <UnProtectedRoute path={ROUTES.SIGN_IN}>
          <SigninPage />
        </UnProtectedRoute>
      </Switch>
    </Router>
  );
}

export default App;
