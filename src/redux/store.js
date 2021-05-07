import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import * as restaurantsReducers from './reducers/restaurantReducers';
import * as locationReducers from './reducers/locationReducers';

const reducer = combineReducers({
  restaurantsList: restaurantsReducers.restaurantsListReducer,
  location: locationReducers.locationReducer,
});

const initialState = {};
const middleware = [thunk];
export default createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);
