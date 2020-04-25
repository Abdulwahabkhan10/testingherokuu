import React from "react";
import { Link, Redirect } from "react-router-dom";
import AddSocialsView from "./Views/AddSocialsView";
import { connect } from "react-redux";
import { updateUser } from "../actions/registerUser";
import Spinner from "./Spinner";
import logo from "../assets/blue-logo.png"
const AddSocials = ({ isAuth, user, updateUser, loading }) => {
  const onSubmit = (socialsUserNames) => {
    updateUser({ social: socialsUserNames });
  };

  if (user) {
    if (
      isAuth &&
      user.avatarUrl !== null &&
      user.bio !== undefined &&
      user.social !== undefined
    ) {
      return <Redirect to={`/dashboard/${user._id}`} />;
    }
  }

  if (!isAuth) {
    return <Redirect to="/register" />;
  }

  if (loading) return <Spinner />;
  else
    return (
      <div className="add-topic social-link">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="logo">
                <Link to="/">
                  <img
                    src={logo}
                    alt="logo"
                  />
                </Link>
              </div>
              <div
                className="headline"
                style={{ position: "relative", display: "inline-block" }}
              >
                <h1 style={{ opacity: "1" }}>
                  Let’s get connected. Are you on any of these social networks?
                </h1>
              </div>
              <AddSocialsView
                onSubmit={onSubmit}
                mode={"gettingStarted"}
                initialState={undefined}
                id={user._id}
              />
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

export default connect(mapStateToProps, { updateUser })(AddSocials);
