import React, { useState, useEffect } from 'react';
import map from '../../assets/map.png';
import { Link } from 'react-router-dom';

let keys = [
  'instagram',
  'venmo',
  'snapchat',
  'twitter',
  'facebook',
  'whatsapp',
  'phone',
  'linkedin',
  'youtube',
  'pinterest',
  'applemusic',
  'spotify',
  'paypal',
  'soundcloud',
  'website',
  'link',
  's_email',
  'address',
];

const AddSocialsView = ({ onSubmit, mode, initialState, id }) => {
  useEffect(() => {
    if (mode !== 'gettingStarted') {
      setstate({ ...state, ...initialState });
    }
  }, []);

  const [state, setstate] = useState({
    instagram: { value: '', clicks: 0 },
    venmo: { value: '', clicks: 0 },
    snapchat: { value: '', clicks: 0 },
    whatsapp: { value: '', clicks: 0 },
    phone: { value: '', clicks: 0 },
    twitter: { value: '', clicks: 0 },
    facebook: { value: '', clicks: 0 },
    linkedin: { value: '', clicks: 0 },
    youtube: { value: '', clicks: 0 },
    pinterest: { value: '', clicks: 0 },
    applemusic: { value: '', clicks: 0 },
    spotify: { value: '', clicks: 0 },
    paypal: { value: '', clicks: 0 },
    soundcloud: { value: '', clicks: 0 },
    website: { value: '', clicks: 0 },
    link: { value: '', clicks: 0 },
    s_email: { value: '', clicks: 0 },
    address: { value: '', clicks: 0 },
  });

  const [display, setdisplay] = useState({
    instagram: 'none',
    venmo: 'none',
    snapchat: 'none',
    twitter: 'none',
    facebook: 'none',
    whatsapp: 'none',
    phone: 'none',
    linkedin: 'none',
    youtube: 'none',
    pinterest: 'none',
    applemusic: 'none',
    spotify: 'none',
    paypal: 'none',
    soundcloud: 'none',
    website: 'none',
    link: 'none',
    s_email: 'none',
    address: 'none',
  });

  const getLink = (social) => {
    if (
      social !== 'address' &&
      social !== 'link' &&
      social !== 's_email' &&
      social !== 'website' &&
      social !== 'phone' &&
      social !== 'whatsapp'
    ) {
      if (state[social].value) {
        if (social === 'spotify') {
          return (
            <li
              className="urlCon"
              style={{ display: display[social] }}
              id="uc_instagram"
            >
              <div>
                <p className="m-0">
                  http://open.{social}.com/add/{state[social].value}
                  <b></b>
                </p>
              </div>
            </li>
          );
        } else if (social === 'snapchat') {
          return (
            <li
              className="urlCon"
              style={{ display: display[social] }}
              id="uc_instagram"
            >
              <div>
                <p className="m-0">
                  http://{social}.com/add/{state[social].value}
                  <b></b>
                </p>
              </div>
            </li>
          );
        } else {
          return (
            <li
              className="urlCon"
              style={{ display: display[social] }}
              id="uc_instagram"
            >
              <div>
                <p className="m-0">
                  http://{social}.com/{state[social].value}
                  <b></b>
                </p>
              </div>
            </li>
          );
        }
      }
    }
  };

  return (
    <div id="show1" className="toppad showtxt1">
      <form onSubmit={(e) => e.preventDefault()}>
        <ul>
          {keys.map((social) => (
            <React.Fragment>
              <li>
                <div className="s-img">
                  <img
                    src={
                      social === 'address'
                        ? map
                        : `https://www.profiles.blue/assets/imgs/social-network-${social}.png`
                    }
                    alt="social"
                  />
                </div>
                <input
                  value={state[social].value}
                  onChange={(e) => {
                    if (
                      e.target.value[e.target.value.length - 1] === ' ' &&
                      e.target.name !== 'address'
                    )
                      return;
                    setstate({
                      ...state,
                      [e.target.name]: {
                        ...state[e.target.name],
                        value: e.target.value,
                      },
                    });
                  }}
                  onFocus={(e) =>
                    setdisplay({ ...display, [e.target.name]: 'block' })
                  }
                  onBlur={(e) =>
                    setdisplay({ ...display, [e.target.name]: 'none' })
                  }
                  name={social}
                  placeholder={social.toUpperCase()}
                  className="socLink"
                  type="text"
                />
              </li>
              {getLink(social)}
            </React.Fragment>
          ))}
        </ul>
        {mode === 'gettingStarted' ? (
          <React.Fragment>
            <Link to={`/dashboard/${id}`}>
              <button
                className="btn w-100prc"
                id="submitBtn"
                onClick={() => onSubmit(state)}
              >
                Connect
              </button>
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Link to={`/dashboard/${id}`}>
              <button
                className="btn w-100prc"
                id="submitBtn"
                onClick={() => onSubmit(state)}
              >
                Save
              </button>
            </Link>
          </React.Fragment>
        )}
      </form>
    </div>
  );
};

export default AddSocialsView;
