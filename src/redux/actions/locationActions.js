import camelize from 'camelize';
import * as locationConst from '../constants/locationConstants';
import { locations } from '../../mock/location';

export const getLocation = (keyword) => async (dispatch) => {
  try {
    if (keyword) {
      dispatch({ type: locationConst.LOCATION_REQUEST, payload: keyword });
      const locationMock = locations[keyword.toLowerCase()];
      if (!locationMock) {
        throw new Error('not found');
      }
      const data = locationTransform(locationMock);
      dispatch({
        type: locationConst.LOCATION_SUCCESS,
        payload: data,
      });
    }
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

  return { lat, lng, viewport: geometry.viewport };
};
