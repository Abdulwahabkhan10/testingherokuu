import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../assets/imgs/blue-logo.png';
import { sendCodeToEmail } from '../actions/resetPassword';

const Reset = ({ isAuth, sendCodeToEmail, emailFound, error }) => {
  useEffect(() => {
    if (error) {
      setloading(false);
      alert(error);
    }
  }, [error]);
  const [email, setemail] = useState();
  const [loading, setloading] = useState(false);
  if (isAuth) {
    return <Redirect to="/register" />;
  }
  if (emailFound) {
    return <Redirect to="/enter_code" />;
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
                setloading(true);
                sendCodeToEmail(email);
              }}
            >
              <h1>Send 4 digit code</h1>
              <p className="p1">
                Enter the email address associated with your account, and we’ll
                email you a 4 digit code to reset your password.
              </p>
              <input
                type="email"
                name="email"
                id="iEmail"
                placeholder="Email address"
                required
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
              <button
                className="btn w-100prc"
                disabled={loading}
                id="submitBtnSendOtp"
              >
                {loading ? 'loading...' : 'Send 4 digit code'}
              </button>
            </form>
            {/* <Link to="login" className="forgot">
              Back to Login?
            </Link> */}
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
});

export default connect(mapStateToProps, { sendCodeToEmail })(Reset);
