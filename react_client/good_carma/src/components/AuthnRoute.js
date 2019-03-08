import React from "react";
import { Route, Redirect } from "react-router-dom";

// Authorization is mainly handled server-side, where it is more secure. When unauthorized, the server sends messages that are displayed as Alerts. This is better UX than navigating completely to a page that has no other function than to tell you you're not authorized.

const AuthnRoute = props => {
  const { isAuth, component, ...restProps } = props;
  const Component = component;
  return(
    <Route
      render={routeProps => {
        if (isAuth) {
          return <Component {...routeProps}>
          </Component>;
        } else {
          return <Redirect to="session/new"/>
        }
      }} 
      {...restProps}
    />
      
  );
};

export default AuthnRoute;