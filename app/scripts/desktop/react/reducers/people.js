import createReducer from './createReducer';
import {
  PEOPLE_REQUEST,
  PEOPLE_SUCCESS,
  PEOPLE_FAILURE,
  PEOPLE_RECOMMENDED_REQUEST,
  PEOPLE_RECOMMENDED_SUCCESS,
  PEOPLE_RECOMMENDED_FAILURE,
} from '../actions/PeopleActions';
import { fromJS } from 'immutable';

const initialState = fromJS({
  ids: [],
  idsRecommended: [],
  signature: void 0,
  isFetching: false,
  isFetchingRecommended: false,
  error: null,
  errorRecommended: null,
});

const actionMap = {
  [PEOPLE_REQUEST](state) {
    return state.merge({
      isFetching: true,
      error: null,
    });
  },

  [PEOPLE_SUCCESS](state, { response, signature }) {
    return state.merge({
      signature,
      ids: response.result,
      isFetching: false,
      error: null,
    });
  },

  [PEOPLE_FAILURE](state, { error, signature }) {
    return state.merge({
      error,
      signature,
      isFetching: false,
    });
  },

  [PEOPLE_RECOMMENDED_REQUEST](state) {
    return state.merge({
      isFetchingRecommended: true,
      errorRecommended: null,
    });
  },

  [PEOPLE_RECOMMENDED_SUCCESS](state, { response }) {
    return state.merge({
      idsRecommended: response.result,
      isFetchingRecommended: false,
      errorRecommended: null,
    });
  },

  [PEOPLE_RECOMMENDED_FAILURE](state, { error }) {
    return state.merge({
      isFetchingRecommended: false,
      errorRecommended: error,
    });
  },
};

export default createReducer(initialState, actionMap);
