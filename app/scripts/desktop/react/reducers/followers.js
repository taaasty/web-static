import createReducer from './createReducer';
import {
  FOLLOWERS_REQUEST,
  FOLLOWERS_SUCCESS,
  FOLLOWERS_FAILURE,
} from '../actions/FollowersActions';

const initialState = {
  ids: [],
  tlogId: null,
  isFetching: false,
  error: null,
};

const actionMap = {
  []() {},
  []() {},
  []() {},
};

export default createReducer(initialState, actionMap);
