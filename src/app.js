import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { compose } from 'recompose';
import { connect, useSelector } from 'react-redux';
import { HomePage, SigninPage, SignupPage, RegisterProspectPage, ProspectPage, ProspectEditPage } from './pages';
import * as ROUTES from './constants/routes';
import { IsUserRedirect, ProtectedRoute } from './helpers/routes';
import { withFirebase } from './context/firebase';
import { useAuthListener } from './hooks';
import { dispatchSetUsers } from './redux/action/user';

function App(props) {
  const { dispatch, firebase, dispatchSetUsersFunction } = props;
  const { user } = useAuthListener(firebase, dispatchSetUsersFunction);
  return user !== false ? (
    <Router>
      <Switch>
        <IsUserRedirect user={user} loggedInPath={ROUTES.HOME} path={ROUTES.SIGN_IN}>
          <SigninPage dispatch={dispatch} />
        </IsUserRedirect>
        <IsUserRedirect user={user} loggedInPath={ROUTES.HOME} path={ROUTES.SIGN_UP}>
          <SignupPage dispatch={dispatch} />
        </IsUserRedirect>
        <ProtectedRoute exact user={user} path={ROUTES.HOME}>
          <HomePage dispatch={dispatch} routes={ROUTES.IN_APP_ROUTES_ASIDE} />
        </ProtectedRoute>
        <ProtectedRoute user={user} path={ROUTES.MANAGE_PROSPECT}>
          <ProspectPage dispatch={dispatch} routes={ROUTES.IN_APP_ROUTES_ASIDE} />
        </ProtectedRoute>
        <ProtectedRoute user={user} path={ROUTES.DETAIL_PROSPECT}>
          <ProspectEditPage dispatch={dispatch} routes={ROUTES.IN_APP_ROUTES_ASIDE} />
        </ProtectedRoute>
      </Switch>
    </Router>
  ) : (
    <div>loader</div>
  );
}

const mapDispatchToProps = {
  dispatchSetUsersFunction: (user) => dispatchSetUsers(user),
};
const mapStateToProps = () => ({});

export default compose(withFirebase, connect(mapStateToProps, mapDispatchToProps))(App);
