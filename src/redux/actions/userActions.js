// import * as userConst from '../constants/userConstants';
// import * as firebase from 'firebase';

// export const login = (email, password) => async (dispatch, getState) => {
//   try {
//     dispatch({ type: userConst.USER_LOGIN_REQUEST });
//     const user = await firebase
//       .auth()
//       .signInWithEmailAndPassword(email, password);
//     dispatch({ type: userConst.USER_LOGIN_SUCCESS, payload: user });
//   } catch (err) {
//     dispatch({
//       type: userConst.USER_LOGIN_FAIL,
//       payload: err.toString(),
//     });
//   }
// };
