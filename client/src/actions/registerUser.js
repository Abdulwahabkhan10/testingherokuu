import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  UPDATE_FAIL,
  GET_PROFILE,
  PROFILE_ERROR,
} from './types';
// import { setAlert } from "./alerts";
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async (disptach) => {
  if (localStorage.token) setAuthToken(localStorage.token);
  try {
    const res = await axios.get('/api/auth/current');
    disptach({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    disptach({
      type: AUTH_ERROR,
    });
  }
};
// Register User
export const registerUser = ({ name, email, password }) => async (disptach) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users/register', body, config);
    disptach({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    disptach(loadUser());
  } catch (err) {
    alert('Email Already Registered');

    disptach({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const loginUser = (email, password) => async (disptach) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth/login', body, config);
    disptach({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    disptach(loadUser());
  } catch (err) {
    // const errors = err.response.data.errors;

    // if (errors) {
    //   errors.forEach((error) => disptach(setAlert(error.msg, "danger")));
    // }
    alert('Username OR Password is not correct');
    disptach({
      type: LOGIN_FAIL,
    });
  }
};

// Add Picture
export const addPic = (obj) => async (disptach) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  const body = JSON.stringify(obj);
  try {
    await axios.post('/api/users/add_pic', body, config);
    disptach(loadUser());
  } catch (err) {
    disptach({
      type: UPDATE_FAIL,
    });
  }
};
export const updateUser = (obj) => async (disptach) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  const body = JSON.stringify(obj);

  try {
    await axios.post('/api/users/update_user', body, config);
    disptach(loadUser());
  } catch (err) {
    disptach({
      type: UPDATE_FAIL,
    });
  }
};

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/current');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const updateClicks = (social, id) => async (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  const body = JSON.stringify(social);

  try {
    const res = await axios.post(
      `/api/users/update_clicks/${id}`,
      body,
      config
    );
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Logout user

export const logout = () => (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
  dispatch({
    type: LOGOUT,
  });
};
