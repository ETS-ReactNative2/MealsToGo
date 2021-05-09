import * as userConst from '../constants/userConstants';

export const userLoginReducer = (
  state = { user: {}, isAuthenticated: false },
  action
) => {
  switch (action.type) {
    case userConst.USER_LOGIN_REQUEST:
      return { loading: true, ...state };
    case userConst.USER_LOGIN_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        isAuthenticated: true,
      };
    case userConst.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload, isAuthenticated: false };
    default:
      return state;
  }
};
