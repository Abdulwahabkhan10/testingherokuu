import axios from 'axios';

export const matchCode = (code, email) => async (disptach) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  const body = JSON.stringify({ code, email });

  try {
    await axios.post('/api/users/code_check', body, config);
    disptach({ type: 'CODE_MATCHED' });
  } catch (err) {
    disptach({
      type: 'ERROR',
      payload: { msg: err.response.data.msg },
    });
    setTimeout(() => {
      disptach({
        type: 'CLEAR_ERROR',
      });
    }, 0);
  }
};

export const resetPassword = (password, user) => async (disptach) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  const body = JSON.stringify({ password, email: user });

  try {
    await axios.post('/api/users/reset_password', body, config);
    disptach({ type: 'PASS_RESET_COMPLETE' });
  } catch (err) {
    disptach({
      type: 'ERROR',
      payload: { msg: err.response.data.msg },
    });
    setTimeout(() => {
      disptach({
        type: 'CLEAR_ERROR',
      });
    }, 0);
  }
};

export const sendCodeToEmail = (email) => async (dispatch) => {
  try {
    await axios.get(`/api/users/reset/${email}`);
    dispatch({
      type: 'EMAIL_FOUND',
      payload: email,
    });
  } catch (err) {
    dispatch({
      type: 'ERROR',
      payload: { msg: err.response.data.msg },
    });
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_ERROR',
      });
    }, 0);
  }
};
