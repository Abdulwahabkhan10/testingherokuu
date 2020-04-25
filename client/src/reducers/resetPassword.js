const initialState = {
  emailFound: false,
  user: null,
  loading: false,
  resetStatus: null,
  error: null,
  codeMatched: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'EMAIL_FOUND':
      return {
        ...state,
        emailFound: true,
        user: payload,
      };
    case 'CODE_MATCHED':
      return {
        ...state,
        codeMatched: true,
      };
    case 'PASS_RESET_COMPLETE':
      return {
        emailFound: false,
        user: null,
        loading: false,
        resetStatus: null,
        error: null,
        codeMatched: false,
      };
    case 'ERROR':
      return {
        ...state,
        error: payload.msg,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
