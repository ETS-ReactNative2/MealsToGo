import * as locationConst from '../constants/locationConstants';

export const locationReducer = (
  state = { keyword: 'San Francisco' },
  action
) => {
  switch (action.type) {
    case locationConst.LOCATION_REQUEST:
      return { loading: true, keyword: action.payload };
    case locationConst.LOCATION_SUCCESS:
      return { loading: false, restaurants: action.payload, ...state };
    case locationConst.LOCATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
