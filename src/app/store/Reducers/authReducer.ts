import { LOGIN_SUCCESS, LOGIN_FAIL } from './../Actions/Login/authactions';
import * as authActions from '../Actions/Login/authactions';

const initial_state = {
  username: null,
  error: null,
  loginTimetamp: null,
};
export function authReducer(
  state = initial_state,
  action: authActions.authactions
) {
  switch (action.type) {
    case authActions.LOGIN_SUCCESS:
      return {
        ...state,
        username: action.payload.username,
        loginTimetamp: new Date(),
      };
    case authActions.LOGIN_FAIL:
      return { ...state, username: null, error: action.payload };
      case authActions.SIGNUP_SUCCESS:
        return {...state,username:action.payload.username,userid:action.payload.userid}
        case authActions.SIGNUP_FAIL :
          return {...state,error:action.payload}
    default:
      return state;
  }
}
