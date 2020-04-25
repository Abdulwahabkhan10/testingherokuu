import React, { useState } from "react";

import logo from "../assets/imgs/blue-logo.png";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../actions/alerts";
import { registerUser } from "../actions/registerUser";

const Register = ({ setAlert, registerUser, isReg }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const { name, email, password } = formData;
  const onChangeHandler = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmitHandler = async e => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      alert("Please Fill All The Fields");
    } else {
      registerUser({ name, email, password });
    }
  };
  if (isReg) {
    return <Redirect to="/add_profile_image" />;
  }

  return (
    <div class="my-name create-account">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="login1">
              <Link to="login" className="account1">
                Have an account?
              </Link>
              <Link to="login" className="log-in">
                LOG IN
              </Link>
            </div>
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className="headline">
              <h1>Hello, lets get started on your profile.</h1>
            </div>
            <br />
            <div>
              <form onSubmit={e => onSubmitHandler(e)}>
                <p className="p1">
                  Enter your email address to create your account.
                </p>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  id="fullname"
                  value={name}
                  onChange={e => onChangeHandler(e)}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  id="email1"
                  value={email}
                  onChange={e => onChangeHandler(e)}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Create a Password"
                  id="pass"
                  value={password}
                  onChange={e => onChangeHandler(e)}
                />

                <button
                  className="btn w-100prc"
                  id="submitBtn"
                  onClick={e => onSubmitHandler(e)}
                >
                  Create Account
                </button>
                <p className="bl">
                  By signing up, you agree to our{" "}
                  <Link to="terms_and_conditions" className="forgot">
                    Terms{" "}
                  </Link>
                  and{" "}
                  <Link to="privacy_policy" className="forgot">
                    Privacy Policy
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  isReg: state.registerUser.isAuth
});
export default connect(mapStateToProps, { setAlert, registerUser })(Register);
