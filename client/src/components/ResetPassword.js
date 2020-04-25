import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import logo from '../assets/imgs/blue-logo.png';
import { resetPassword } from '../actions/resetPassword';

const ResetPassword = ({
  isAuth,
  resetPassword,
  emailFound,
  error,
  codeMatched,
  user,
}) => {
  const [password, setpassword] = useState({
    Pass: '',
    rePass: '',
  });

  if (isAuth || !emailFound || !codeMatched) {
    alert('Password Reset Successful Login with new password');
    return <Redirect to="/login" />;
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
              id="resetPass"
              onSubmit={(e) => {
                e.preventDefault();
                if (password.Pass !== password.rePass) {
                  alert("Password doesn't match");
                }
                resetPassword(password.Pass, user);
              }}
            >
              <h1>Reset Password</h1>
              <p className="p1"></p>
              <input
                type="password"
                name="password"
                id="Pass"
                placeholder="New Password"
                required
                minLength="6"
                value={password.Pass}
                onChange={(e) =>
                  setpassword({ ...password, [e.target.id]: e.target.value })
                }
              />
              <input
                type="password"
                id="rePass"
                placeholder="Retype Password"
                required
                minLength="6"
                value={password.rePass}
                onChange={(e) =>
                  setpassword({ ...password, [e.target.id]: e.target.value })
                }
              />
              <button className="btn w-100prc" id="submitBtnResetPass">
                Submit
              </button>
            </form>
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

export default connect(mapStateToProps, { resetPassword })(ResetPassword);
