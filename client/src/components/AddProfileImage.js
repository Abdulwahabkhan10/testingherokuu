import React, { useState } from "react";
import avatar from "../assets/imgs/blue-logo.png";
import { Link, Redirect } from "react-router-dom";
import firebase from "../config/fbConfig";
import FileUploader from "react-firebase-file-uploader";
import { updateUser } from "../actions/registerUser";
import { connect } from "react-redux";
import Spinner from "./Spinner";

const AddProfileImage = ({ updateUser, user, isAuth, loading }) => {
  const [state, setstate] = useState({
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: "",
  });
  const [imgLoading, setimgLoading] = useState(false);
  const handleUploadStart = () => {
    setimgLoading(true);
    setstate({ isUploading: true, progress: 0 });
  };
  const handleProgress = (progress) => setstate({ progress });
  const handleUploadError = (error) => {
    setstate({ isUploading: false });
  };
  const handleUploadSuccess = (filename) => {
    setstate({ avatar: filename, progress: 100 });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then((url) => setstate({ avatarURL: url }));

    setTimeout(() => {
      setimgLoading(false);
    }, 5000);
  };

  const handleUpdateUser = () => {
    if (state.avatarURL === "") {
      alert("Image is Required");
    }
    updateUser({ avatarUrl: state.avatarURL });
  };

  if (user) {
    if (isAuth && user.avatarUrl !== null) {
      return <Redirect to="/bio" />;
    }
  }

  if (!isAuth) {
    return <Redirect to="/register" />;
  }

  if (loading || !user) return <Spinner />;
  else
    return (
      <div className="my-name add-pro-photo">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="logo">
                <Link to="/">
                  <img src={avatar} alt="logo" />
                </Link>
              </div>
              <div
                className="headline"
                style={{ position: "relative", display: "inline-block" }}
              >
                <h1 style={{ opacity: "1" }}>
                  Add a selfie so people you cross paths with know its you.
                </h1>
              </div>

              <div id="show1" className="toppad showtxt1">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="upload-btn-wrapper">
                    {imgLoading ? (
                      <Spinner />
                    ) : (
                      <img
                        src={
                          state.avatarURL ||
                          "https://www.profiles.blue/assets/imgs/photo.png"
                        }
                        id="tmpImg"
                        alt="logo"
                      />
                    )}

                    <button className="btnn">
                    
                    </button>
                    <FileUploader
                      accept="image/*"
                      name="avatar"
                      id="img"
                      randomizeFilename
                      storageRef={firebase.storage().ref("images")}
                      onUploadStart={handleUploadStart}
                      onUploadError={handleUploadError}
                      onUploadSuccess={handleUploadSuccess}
                      onProgress={handleProgress}
                  
                    />
                  </div>
                  <div
                    className="headline"
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <p>
                      Add a profile photo so people you cross paths with know
                      it’s you.
                    </p>
                  </div>
            
                  <button
                    className="btn w-100prc"
                    id="submitBtn"
                    onClick={handleUpdateUser}
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

export default connect(mapStateToProps, { updateUser })(AddProfileImage);
