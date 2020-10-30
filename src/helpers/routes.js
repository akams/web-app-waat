import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { checkAuthorizationWithRoutes } from '../services/auth.service';

export function IsUserRedirect({ user, loggedInPath, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => {
        if (!user) {
          return children;
        }

        if (user) {
          return (
            <Redirect
              to={{
                pathname: loggedInPath,
              }}
            />
          );
        }

        return null;
      }}
    />
  );
}

export function ProtectedRoute({ user, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user) {
          // const { pathname } = location;
          // if (checkAuthorizationWithRoutes(user, pathname)) {
          return children;
          // }
        }

        if (!user) {
          return (
            <Redirect
              to={{
                pathname: '/signin',
                state: { from: location },
              }}
            />
          );
        }

        return null;
      }}
    />
  );
}

export function UnProtectedRoute({ children, ...rest }) {
  return <Route {...rest} render={() => children} />;
}
