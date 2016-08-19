import createReducer from './createReducer';
import { Map } from 'immutable';
import {
  ENTRY_VOTE_REQUEST,
  ENTRY_VOTE_SUCCESS,
  ENTRY_VOTE_FAILURE,
} from '../actions/EntryActions';

const actionMap = {
  [ENTRY_VOTE_REQUEST](state, { entryId }) {
    return state.setIn([ entryId, 'isVoting' ], true);
  },
    
  [ENTRY_VOTE_SUCCESS](state, { entryId }) {
    return state.setIn([ entryId, 'isVoting' ], false);
  },
    
  [ENTRY_VOTE_FAILURE](state, { entryId }) {
    return state.setIn([ entryId, 'isVoting' ], false);
  },
  
};

export default createReducer(Map(), actionMap);
