import { combineReducers } from 'redux';
import registerUser from './registerUser';
import resetPassword from './resetPassword';
export default combineReducers({
  registerUser,
  resetPassword,
});
