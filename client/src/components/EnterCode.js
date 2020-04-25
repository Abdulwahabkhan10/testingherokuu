import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import logo from '../assets/imgs/blue-logo.png';
import { matchCode } from '../actions/resetPassword';

const EnterCode = ({
  isAuth,
  matchCode,
  emailFound,
  error,
  codeMatched,
  user,
}) => {
  const [code, setcode] = useState();

  if (isAuth || !emailFound) {
    return <Redirect to="/register" />;
  }

  if (codeMatched) {
    return <Redirect to="/new_password" />;
  }
  if (error) {
    alert(error);
  }

  return (
    <div class="my-name create-account wel-back">
      <div className="container">
        <div className="row">
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
            <form
              id="sendOtp"
              onSubmit={(e) => {
                e.preventDefault();
                matchCode(code, user);
              }}
            >
              <h1>Enter 4 digit code</h1>
              <input
                type="text"
                name="code"
                id="iEmail"
                placeholder="Code"
                required
                minLength="4"
                maxLength="4"
                value={code}
                onChange={(e) => setcode(e.target.value)}
              />
              <button className="btn w-100prc" id="submitBtnSendOtp">
                Submit
              </button>
            </form>

            <Link to="login" className="forgot">
              Back to Login?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.registerUser.isAuth,
  loading: state.registerUser.loading,
  emailFound: state.resetPassword.emailFound,
  error: state.resetPassword.error,
  codeMatched: state.resetPassword.codeMatched,
  user: state.resetPassword.user,
});

export default connect(mapStateToProps, { matchCode })(EnterCode);
