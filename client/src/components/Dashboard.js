import React, { useState } from 'react';
import qr from '../assets/imgs/qr-code.svg';
import user from '../assets/imgs/users/33137_5d4db4dc17d01709aac1ce0a4567a278.jpg';
import { Link, Redirect, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Footer from './Footer';
import Spinner from './Spinner';
import { logout, updateClicks } from '../actions/registerUser';
import logo from '../assets/blue-logo.png';
import xclose from '../assets/xclose.png';
import map from '../assets/map.png';
var QRCode = require('qrcode.react');

const Dashboard = ({
  authh: { isAuth, loading },
  logout,
  user,
  updateClicks,
}) => {
  const [show, setshow] = useState('');
  const { id } = useParams();

  if (id === undefined && !isAuth && !loading)
    return <Redirect to='/register' />;
  else if ((!isAuth || (id !== undefined && user._id !== id)) && !loading) {
    return <Redirect to={`/profile/${id}`} />;
  }

  const handleClicks = (name) => {
    let social = {
      ...user.social,
      [name]: {
        ...user.social[name],
        clicks: user.social[name].clicks + 1,
      },
    };
    updateClicks({ social }, user._id);
  };

  const getLink = (username) => {
    if (user.social[username]) {
      if (username === 'spotify')
        return `http://open.${username}.com/add/${user.social[username].value}`;
      else if (username === 'snapchat')
        return `http://${username}.com/add/${user.social[username].value}`;
      else if (username === 'address')
        return `https://www.google.com/maps/place/${user.social[username].value}`;
      else if (username === 'phone')
        return `tel:+92${user.social[username].value}`;
      else if (username === 's_email')
        return `mailto:${user.social[username].value}`;
      else if (username === 'website')
        return `http://${user.social[username].value}`;
      else if (username === 'link')
        return `http://${user.social[username].value}`;
      else if (username === 'linkedin')
        return `http://${username}.com/in/${user.social[username].value}`;
      else if (username === 'whatsapp')
        return `http://api.${username}.com/send?phone=+92${user.social[username].value}`;
      else return `http://${username}.com/${user.social[username].value}`;
    }
  };

  if (loading || !user.social) return <Spinner />;
  else
    return (
      <div>
        <div className='tuto1'>
          <div className='container'>
            <div className='row'>
              <div className='col-12'>
                <div className='tuto-ttl'>
                  <Link
                    to='/edit_profile'
                    className='edit1'
                    style={{ marginTop: '9px' }}
                  >
                    Edit Profile
                  </Link>
                  <h1>Hello</h1>
                  <span>
                    <a href='!#'></a>
                    my name is
                  </span>
                  <Link to='/login' onClick={logout}>
                    <i className=''></i>
                    Log out
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='my-profile'>
          <div className='container'>
            <div className='row'>
              <div
                className='col-12 text-right pt-2 pl-2 pr-2'
                onClick={() => setshow('show')}
              >
                <img
                  src={qr}
                  width='25'
                  className='showPopup'
                  target='#profileQrCon'
                />
              </div>
              <div class='col-12 text-center pViewSec'>
                Profile views {user.views}
              </div>
              <div className='col-12'>
                <div className='my-profile-photo'>
                  <img src={user.avatarUrl} alt='photo' id='profileImg' />
                </div>
                <h1 id='name'>{user.name} </h1>

                <p id='bio'>{user.bio}</p>

                <b className='text-center mt-2 mb-2 d-block'>
                  <div className='col-12 social2'>
                    <ul className='row'>
                      {Object.keys(user.social).map(
                        (username) =>
                          user.social[username].value !== '' && (
                            <React.Fragment>
                              <li className='col-12'>
                                <a
                                  type='instagram'
                                  href={getLink(username)}
                                  target='_blank'
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    width: '100%',
                                    margin: 'auto',
                                  }}
                                  onClick={() => handleClicks(username)}
                                >
                                  <img
                                    src={
                                      username === 'address'
                                        ? map
                                        : `https://www.profiles.blue/assets/imgs/social-network-${username}.png`
                                    }
                                  />
                                  <div
                                    style={{
                                      marginLeft: '16px',
                                      padding: '0',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      alignItems: 'flex-start',
                                    }}
                                  >
                                    <p
                                      style={{
                                        margin: '0',
                                        padding: '0',
                                        fontSize: '14px',
                                      }}
                                    >
                                      <b>
                                        {username.charAt(0).toUpperCase() +
                                          username.slice(1)}
                                      </b>
                                    </p>
                                    <p
                                      style={{
                                        margin: '0',
                                        padding: '0',
                                        fontSize: '14px',
                                      }}
                                    >
                                      <span>
                                        {user.social[username].clicks}
                                      </span>{' '}
                                      Clicks
                                    </p>
                                  </div>
                                </a>
                              </li>
                              <span
                                style={{
                                  borderTop: '1px solid #bdbdbd',
                                  // height: '1px',
                                  width: '100%',
                                  margin: 'auto',
                                }}
                              ></span>
                            </React.Fragment>
                          )
                      )}
                    </ul>
                  </div>
                </b>
              </div>
            </div>
          </div>
          <Footer />
        </div>

        <div>
          <div className={`col-12 ${show}`} id='profileQrCon'>
            <div
              className='col-12 text-right pt-4 p-0'
              onClick={() => setshow('')}
            >
              <img
                src={xclose}
                width='25'
                className='clsPopup'
                target='#profileQrCon'
                alt='QR CODE'
              />
            </div>
            <div className='col-12 r2 text-center'>
              <div className='my-profile-photo'>
                <img src={user.avatarUrl} alt='Avatar' id='profileImg' />
              </div>
              <div className='col-12 p-2'>
                <h1>
                  <b>{user.name}</b>
                </h1>
              </div>
            </div>

            <div className='col-12 text-center r3' width='200'>
              <QRCode
                value={`https://profilesred.herokuapp.com/profile/${user._id}`}
              />
            </div>
            <div className='col-12 text-center r4'>
              <b>Scan this code with a camera</b>
              <br />
              <b>to share your Blue profile.</b>
            </div>
            <div className='col-12 text-center r5'>
              <img src={logo} width='100' alt='LOGO' />
            </div>
          </div>
        </div>
      </div>
    );
};

const mapStateToProps = (state) => ({
  authh: state.registerUser,
  user: state.registerUser.user,
});

export default connect(mapStateToProps, { logout, updateClicks })(Dashboard);
