import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import {
  HomePage,
  SigninPage,
  SignupPage,
  SignupEnd,
  SignupBusinessPage,
  RegisterProspectPage,
  ProspectPage,
  ProspectEditPage,
  ManageUsers,
  ForgotPassword,
  Profil,
  NotFound,
} from './pages';
import * as ROUTES from './constants/routes';
import { IsUserRedirect, ProtectedRoute, UnProtectedRoute } from './helpers/routes';
import { withFirebase } from './context/firebase';
import { useAuthListener } from './hooks';
import { dispatchSetUsers } from './redux/action/user';

function App(props) {
  const { dispatch, firebase, dispatchSetUsersFunction } = props;
  const { user } = useAuthListener(firebase, dispatchSetUsersFunction);
  return user !== false ? (
    <Router>
      <Switch>
        <IsUserRedirect
          user={user}
          confirmEmailVerifiedPath={ROUTES.SIGN_UP_END}
          loggedInPath={ROUTES.HOME}
          path={ROUTES.SIGN_IN}
        >
          <SigninPage dispatch={dispatch} />
        </IsUserRedirect>
        <IsUserRedirect
          user={user}
          confirmEmailVerifiedPath={ROUTES.SIGN_UP_END}
          loggedInPath={ROUTES.HOME}
          path={ROUTES.SIGN_UP_GUEST}
        >
          <SignupBusinessPage dispatch={dispatch} />
        </IsUserRedirect>
        <IsUserRedirect
          user={user}
          confirmEmailVerifiedPath={ROUTES.SIGN_UP_END}
          loggedInPath={ROUTES.HOME}
          path={ROUTES.SIGN_UP}
        >
          <SignupPage dispatch={dispatch} />
        </IsUserRedirect>
        <IsUserRedirect
          user={user}
          confirmEmailVerifiedPath={ROUTES.SIGN_UP_END}
          loggedInPath={ROUTES.HOME}
          path={ROUTES.FORGOT_PWD}
        >
          <ForgotPassword dispatch={dispatch} />
        </IsUserRedirect>
        <UnProtectedRoute path={ROUTES.SIGN_UP_END}>
          <SignupEnd dispatch={dispatch} />
        </UnProtectedRoute>
        <ProtectedRoute exact user={user} path={ROUTES.HOME}>
          <HomePage dispatch={dispatch} routes={ROUTES.IN_APP_ROUTES_ASIDE} />
        </ProtectedRoute>
        <ProtectedRoute user={user} path={ROUTES.MANAGE_PROSPECT}>
          <ProspectPage dispatch={dispatch} routes={ROUTES.IN_APP_ROUTES_ASIDE} />
        </ProtectedRoute>
        <ProtectedRoute user={user} path={ROUTES.DETAIL_PROSPECT}>
          <ProspectEditPage dispatch={dispatch} routes={ROUTES.IN_APP_ROUTES_ASIDE} />
        </ProtectedRoute>
        <ProtectedRoute user={user} path={ROUTES.REGISTER_PROSPECT}>
          <RegisterProspectPage routes={ROUTES.IN_APP_ROUTES_ASIDE} dispatch={dispatch} />
        </ProtectedRoute>
        <ProtectedRoute user={user} path={ROUTES.MANAGE_USERS}>
          <ManageUsers routes={ROUTES.IN_APP_ROUTES_ASIDE} dispatch={dispatch} />
        </ProtectedRoute>
        <ProtectedRoute user={user} path={ROUTES.MY_PROFIL}>
          <Profil routes={ROUTES.IN_APP_ROUTES_ASIDE} dispatch={dispatch} />
        </ProtectedRoute>
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  ) : (
    <div className="loader">
      <div className="preloader-preview-area" />
    </div>
  );
}

const mapDispatchToProps = {
  dispatchSetUsersFunction: (user) => dispatchSetUsers(user),
};
const mapStateToProps = () => ({});

export default compose(withFirebase, connect(mapStateToProps, mapDispatchToProps))(App);
