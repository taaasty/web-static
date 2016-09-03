import createReducer from './createReducer';
import { Map } from 'immutable';
import {
  ENTRY_VOTE_REQUEST,
  ENTRY_VOTE_SUCCESS,
  ENTRY_VOTE_FAILURE,
} from '../actions/EntryActions';
import {
  TLOG_ENTRIES_RATINGS_REQUEST,
  TLOG_ENTRIES_RATINGS_SUCCESS,
  TLOG_ENTRIES_RATINGS_FAILURE,
} from '../actions/TlogEntriesActions';

const actionMap = {
  [ENTRY_VOTE_REQUEST](state, { entryId }) {
    return state.setIn([entryId, 'isFetching'], true);
  },

  [ENTRY_VOTE_SUCCESS](state, { entryId }) {
    return state.setIn([entryId, 'isFetching'], false);
  },

  [ENTRY_VOTE_FAILURE](state, { entryId }) {
    return state.setIn([entryId, 'isFetching'], false);
  },

  [TLOG_ENTRIES_RATINGS_REQUEST](state, { entries }) {
    return state.mergeDeep(entries.map(() => Map({
      isFetching: true,
    })));
  },

  [TLOG_ENTRIES_RATINGS_SUCCESS](state, { entries }) {
    return state.mergeDeep(entries.map(() => Map({
      isFetching: false,
    })));
  },

  [TLOG_ENTRIES_RATINGS_FAILURE](state, { entries }) {
    return state.mergeDeep(entries.map(() => Map({
      isFetching: false,
    })));
  },
};

export default createReducer(Map(), actionMap);
