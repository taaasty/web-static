import createReducer from './createReducer';
import {
  PEOPLE_REQUEST,
  PEOPLE_RECEIVE,
  PEOPLE_ERROR,
  PEOPLE_RESET,
  PEOPLE_RECOMMENDED_REQUEST,
  PEOPLE_RECOMMENDED_RECEIVE,
  PEOPLE_RECOMMENDED_ERROR,
} from '../actions/PeopleActions';

const initialState = {
  data: [],
  dataRecommended: [],
  query: void 0,
  isFetching: false,
  isFetchingRecommended: false,
  error: null,
  errorRecommended: null,
  sort: null,
};

const actionMap = {
  [PEOPLE_REQUEST](state) {
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  },

  [PEOPLE_RECEIVE](state, data) {
    return {
      ...state,
      ...data,
      isFetching: false,
      error: null,
    };
  },

  [PEOPLE_ERROR](state, error) {
    return {
      ...state,
      ...error,
      isFetching: false,
    };
  },

  [PEOPLE_RESET](state) {
    return {
      ...state,
      data: [],
    };
  },

  [PEOPLE_RECOMMENDED_REQUEST](state) {
    return {
      ...state,
      isFetchingRecommended: true,
      errorRecommended: null,
    };
  },

  [PEOPLE_RECOMMENDED_RECEIVE](state, data) {
    return {
      ...state,
      ...data,
      isFetchingRecommended: false,
      errorRecommended: null,
    };
  },

  [PEOPLE_RECOMMENDED_ERROR](state, error) {
    return {
      ...state,
      isFetchingRecommended: false,
      errorRecommended: error,
    };
  },
};

export default createReducer(initialState, actionMap);
