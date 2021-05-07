import camelize from 'camelize';
import * as locationConst from '../constants/locationConstants';
import { locations } from '../../mock/location';

export const getRestaurantsList = (keyword) => async (dispatch) => {
  try {
    dispatch({ type: locationConst.LOCATION_REQUEST, payload: keyword });
    const locationMock = locations[keyword];
    if (!locationMock) {
      throw new Error('not found');
    }
    const data = locationTransform(locationMock);
    setTimeout(() => {
      dispatch({
        type: locationConst.LOCATION_SUCCESS,
        payload: data,
      });
    }, 2000);
  } catch (err) {
    dispatch({
      type: locationConst.LOCATION_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const locationTransform = (result) => {
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;

  return { lat, lng };
};
