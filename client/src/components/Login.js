import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo from '../assets/imgs/blue-logo.png';
import { connect } from 'react-redux';
import { loginUser } from '../actions/registerUser';

const Login = ({ loginUser, isAuth }) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = loginData;
  const onChangeHandler = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    loginUser(email, password);
  };
  if (isAuth) {
    return <Redirect to="/add_profile_image" />;
  }
  return (
    <div class="my-name create-account wel-back">
      <div className="container">
        <div className="row">
          <form onSubmit={(e) => onSubmitHandler(e)}>
            <div className="col-12">
              <div className="login1">
                <Link to="register" className="account1">
                  Don’t have an account?
                </Link>
                <Link to="register" className="log-in">
                  SIGN UP
                </Link>
              </div>
              <div className="logo">
                <Link to="/">
                  <img src={logo} alt="logo" />
                </Link>
              </div>
              <div className=" headline">
                <h1>Welcome back, To Blue!</h1>
              </div>
              <div className="headline">
                <p className="p1">
                  Enter your email address and password to access your account.
                </p>
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => onChangeHandler(e)}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => onChangeHandler(e)}
                required
              />
              <button className="btn w-100prc" type="submit" id="submitBtn">
                Log In
              </button>
              <Link to="reset_password" className="forgot">
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.registerUser.isAuth,
});

export default connect(mapStateToProps, { loginUser })(Login);
