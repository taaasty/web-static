import createReducer from './createReducer';
import {
  PEOPLE_REQUEST,
  PEOPLE_SUCCESS,
  PEOPLE_FAILURE,
  PEOPLE_RECOMMENDED_REQUEST,
  PEOPLE_RECOMMENDED_SUCCESS,
  PEOPLE_RECOMMENDED_FAILURE,
} from '../actions/PeopleActions';

const initialState = {
  ids: [],
  idsRecommended: [],
  signature: void 0,
  isFetching: false,
  isFetchingRecommended: false,
  error: null,
  errorRecommended: null,
};

const actionMap = {
  [PEOPLE_REQUEST](state) {
    return Object.assign({}, state, {
      isFetching: true,
      error: null,
    });
  },

  [PEOPLE_SUCCESS](state, { response, signature }) {
    return Object.assign({}, state, {
      signature,
      ids: response.result,
      isFetching: false,
      error: null,
    });
  },

  [PEOPLE_FAILURE](state, error) {
    return Object.assign({}, state, {
      error,
      isFetching: false,
    });
  },

  [PEOPLE_RECOMMENDED_REQUEST](state) {
    return {
      ...state,
      isFetchingRecommended: true,
      errorRecommended: null,
    };
  },

  [PEOPLE_RECOMMENDED_SUCCESS](state, data) {
    return {
      ...state,
      ...data,
      isFetchingRecommended: false,
      errorRecommended: null,
    };
  },

  [PEOPLE_RECOMMENDED_FAILURE](state, error) {
    return {
      ...state,
      isFetchingRecommended: false,
      errorRecommended: error,
    };
  },
};

export default createReducer(initialState, actionMap);
