import createReducer from './createReducer';
import {
  USER_ONBOARDING_REQUEST,
  USER_ONBOARDING_SUCCESS,
  USER_ONBOARDING_FAILURE,
} from '../actions/UserOnboardingActions';
import { fromJS } from 'immutable';

const initialState = fromJS({
  data: {},
  isFetching: false,
  error: null,
});

const actionMap = {
  [USER_ONBOARDING_REQUEST](state) {
    return state.merge({ isFetching: true, error: null });
  },

  [USER_ONBOARDING_SUCCESS](state, { response }) {
    return state.merge({
      data: response.results,
      isFetching: false,
      error: null,
    });
  },

  [USER_ONBOARDING_FAILURE](state, { error }) {
    return state.merge({
      error,
      isFetching: false,
    });
  },
};

export default createReducer(initialState, actionMap);
