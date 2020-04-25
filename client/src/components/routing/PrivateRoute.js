import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({
  component: Component,
  registerUser: { isAuth, },
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !isAuth ? <Redirect to="/login" /> : <Component {...props} />
    }
  />
);
const mapStateToProps = state => ({
  registerUser: state.registerUser
});

export default connect(mapStateToProps)(PrivateRoute);