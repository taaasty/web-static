import createReducer from '../../reducers/createReducer';
import { OrderedSet, fromJS } from 'immutable';
import {
  MSG_GROUP_SAVE_REQUEST,
  MSG_GROUP_SAVE_SUCCESS,
  MSG_GROUP_SAVE_FAILURE,
  MSG_GROUP_ADD_USER,
  MSG_GROUP_SELECT_USER,
  MSG_GROUP_UNSELECT_USER,
  MSG_GROUP_INIT,
  MSG_GROUP_RESET,
} from '../actions/GroupSettingsActions';

const initialState = fromJS({
  data: {
    admin: null,
    avatar: null,
    id: null,
    topic: '',
    users: OrderedSet(),
  },
  error: null,
  isFetching: false,
  selected: OrderedSet(),
});

const actionMap = {
  [MSG_GROUP_INIT](state, { data }) {
    const {
      admin,
      avatar,
      id,
      topic = '',
      users,
      selected,
    } = data;

    return fromJS({
      data: {
        admin,
        avatar,
        id,
        topic,
        users: users ? users.toOrderedSet() : OrderedSet(),
      },
      isFetching: false,
      error: null,
      selected: selected ? selected.toOrderedSet() : OrderedSet(),
    });
  },

  [MSG_GROUP_RESET]() {
    return initialState;
  },

  [MSG_GROUP_ADD_USER](state, { user }) {
    return state
      .updateIn(
        ['data', 'users'],
        OrderedSet(),
        (s) => s.add(user.get('id'))
      );
  },

  [MSG_GROUP_SELECT_USER](state, { user }) {
    return state.update('selected', (s) => s.add(user.get('id')));
  },

  [MSG_GROUP_UNSELECT_USER](state, { user }) {
    return state.update('selected', (s) => s.delete(user.get('id')));
  },

  [MSG_GROUP_SAVE_REQUEST](state) {
    return state.merge({
      isFetching: true,
      error: null,
    });
  },

  [MSG_GROUP_SAVE_SUCCESS](state) {
    return state.merge({
      isFetching: false,
      error: null,
    });
  },

  [MSG_GROUP_SAVE_FAILURE](state, { error }) {
    return state.merge({
      isFetching: false,
      error,
    });
  },
};

export default createReducer(initialState, actionMap);
