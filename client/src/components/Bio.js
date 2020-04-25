import React, { useState } from "react";
import logo from "../assets/imgs/blue-logo.png";
import { Link, Redirect } from "react-router-dom";
import { updateUser } from "../actions/registerUser";
import { connect } from "react-redux";
import Spinner from "./Spinner";
const Bio = ({ updateUser, user, isAuth, loading }) => {
  const [state, setstate] = useState({
    bio: "",
  });
  const { bio } = state;
  const onChangeHandler = (e) =>
    setstate({ ...state, [e.target.name]: e.target.value });
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (bio === "") {
      alert("Please Add Bio to your profile");
    } else {
      updateUser({ bio });
    }
  };
  if (user) {
    if (isAuth && user.avatarUrl !== null && user.bio !== undefined) {
      return <Redirect to="/add_socials" />;
    }
  }

  if (!isAuth) {
    return <Redirect to="/register" />;
  }

  if (loading) return <Spinner />;
  else
    return (
      <div class="my-name my-bio">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="logo">
                <Link to="/">
                  <img src={logo} alt="logo" />
                </Link>
              </div>
              <div
                class="headline"
                style={{ position: "relative", display: "inline-block" }}
              >
                <h1 c style={{ opacity: "1" }}>
                  Tell me about yourself…
                </h1>
              </div>
              <div id="show1" class="showtxt1">
                <form>
                  <div class="form-con">
                    <textarea
                      placeholder="My Bio"
                      name="bio"
                      style={{ width: "100%" }}
                      value={bio}
                      onChange={(e) => onChangeHandler(e)}
                    />
                  </div>

                  <button
                    className="btn w-100prc"
                    id="submitBtn"
                    onClick={onSubmitHandler}
                  >
                    Next
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};
const mapStateToProps = (state) => ({
  user: state.registerUser.user,
  isAuth: state.registerUser.isAuth,
  loading: state.registerUser.loading,
});

export default connect(mapStateToProps, { updateUser })(Bio);
