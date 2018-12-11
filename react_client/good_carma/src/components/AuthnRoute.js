import React from "react";
import { Route, Redirect } from "react-router-dom";

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
          <Redirect to="session/new"/>
        }
      }} 
      {...restProps}
    />
      
  );
};

export default AuthnRoute;