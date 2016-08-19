import createReducer from './createReducer';
import {
  FLOW_CREATOR_SET,
  FLOW_CREATOR_RESET,
  FLOW_CREATOR_ADD_STAFF,
  FLOW_CREATOR_REMOVE_STAFF,
} from '../actions/FlowCreatorActions';
import { Map, OrderedSet, fromJS } from 'immutable';

const initialState = fromJS({
  name: '',
  title: '',
  flowpic: {},
  staffs: OrderedSet(),
});

const actionMap = {
  [FLOW_CREATOR_SET](state, { key, value }) {
    return state.set(key, value);
  },

  [FLOW_CREATOR_RESET]() {
    return initialState;
  },
  
  [FLOW_CREATOR_ADD_STAFF](state, { user, role }) {
    return state.update('staffs', (s) => s.add(Map({ user, role })));
  },

  [FLOW_CREATOR_REMOVE_STAFF](state, { staff }) {
    return state.update('staffs', (s) => s.delete(staff));
  },
};

export default createReducer(initialState, actionMap);
