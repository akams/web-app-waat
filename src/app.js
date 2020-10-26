import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { HomePage, SigninPage, RegisterProspectPage, ProspectPage, ProspectEditPage } from './pages';
import * as ROUTES from './constants/routes';
import { UnProtectedRoute } from './helpers/routes';

function App(props) {
  const { dispatch } = props;
  return (
    <Router>
      <Switch>
        <UnProtectedRoute exact path={ROUTES.HOME}>
          <HomePage dispatch={dispatch} routes={ROUTES.IN_APP_ROUTES} />
        </UnProtectedRoute>
        <UnProtectedRoute path={ROUTES.REGISTER_PROSPECT}>
          <RegisterProspectPage dispatch={dispatch} />
        </UnProtectedRoute>
        <UnProtectedRoute path={ROUTES.MANAGE_PROSPECT}>
          <ProspectPage dispatch={dispatch} routes={ROUTES.IN_APP_ROUTES} />
        </UnProtectedRoute>
        <UnProtectedRoute path={ROUTES.DETAIL_PROSPECT}>
          <ProspectEditPage dispatch={dispatch} routes={ROUTES.IN_APP_ROUTES} />
        </UnProtectedRoute>
        <UnProtectedRoute path={ROUTES.SIGN_IN}>
          <SigninPage />
        </UnProtectedRoute>
      </Switch>
    </Router>
  );
}

export default App;
