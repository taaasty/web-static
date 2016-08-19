import createReducer from '../../reducers/createReducer';
import { fromJS } from 'immutable';
import {
  MSG_CHOOSER_USERS_REQUEST,
  MSG_CHOOSER_USERS_SUCCESS,
  MSG_CHOOSER_USERS_FAILURE,
  MSG_CHOOSER_SELECT_NEXT,
  MSG_CHOOSER_SELECT_PREV,
  MSG_CHOOSER_SET_QUERY,
} from '../actions/ChooserActions';

const initialState = fromJS({
  users: [],
  query: '',
  selectedIndex: 0,
  isFetching: false,
  error: null,
});

const actionMap = {
  [MSG_CHOOSER_SET_QUERY](state, { query }) {
    return query.length === 0 ?
      state.merge({
        query: '',
        users: [],
        selectedIndex: 0,
        isFetching: false,
        error: null,
      }) :
      state.set('query', query);
  },

  [MSG_CHOOSER_USERS_REQUEST](state) {
    return state.merge({
      isFetching: true,
      error: null,
    })
  },

  [MSG_CHOOSER_USERS_SUCCESS](state, { response, query }) {
    return state.get('query') === query ?
      state.merge({
        users: response.result,
        selectedIndex: 0,
        isFetching: false,
        error: null,
      }) :
      state;
  },

  [MSG_CHOOSER_USERS_FAILURE](state, { error }) {
    return state.merge({
      isFetching: false,
      error,
    })
  },

  [MSG_CHOOSER_SELECT_NEXT](state) {
    return state.set(
      'selectedIndex',
      Math.min(
        state.get('users')
        .count() - 1,
        state.get('selectedIndex') + 1
      )
    );
  },

  [MSG_CHOOSER_SELECT_PREV](state) {
    return state.set(
      'selectedIndex',
      Math.max(
        0,
        state.get('selectedIndex') - 1
      )
    );
  },
};

export default createReducer(initialState, actionMap);
