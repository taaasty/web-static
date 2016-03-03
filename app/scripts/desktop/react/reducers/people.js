import createReducer from './createReducer';
import {
  PEOPLE_REQUEST,
  PEOPLE_RECEIVE,
  PEOPLE_ERROR,
  PEOPLE_RESET,
} from '../actions/PeopleActions';

const initialState = {
  data: [],
  isFetching: false,
  error: null,
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
};

export default createReducer(initialState, actionMap);
