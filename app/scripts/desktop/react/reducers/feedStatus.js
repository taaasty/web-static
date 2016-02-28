import createReducer from './createReducer';
import {
  FEED_LIVE_NEW_ENTRY,
  FEED_LIVE_RESET,
  FEED_BEST_NEW_ENTRY,
  FEED_BEST_RESET,
  FEED_FRIENDS_NEW_ENTRY,
  FEED_FRIENDS_RESET,
  FEED_ANONYMOUS_NEW_ENTRY,
  FEED_ANONYMOUS_RESET,
  FEED_LIVE_FLOW_NEW_ENTRY,
  FEED_LIVE_FLOW_RESET,
} from '../actions/FeedStatusActions';

const initialState = {
  live: [],
  liveInitialCount: 0,
  best: [],
  bestInitialCount: 0,
  friends: [],
  friendsInitialCount: 0,
  anonymous: [],
  anonymousInitialCount: 0,
  liveFlow: [],
  liveFlowInitialCount: 0,
};

const actionMap = {
  [FEED_LIVE_NEW_ENTRY](state, entry) {
    return {
      ...state,
      live: [ ...state.live, entry ],
    };
  },

  [FEED_LIVE_RESET](state) {
    return {
      ...state,
      live: [],
    };
  },

  [FEED_BEST_NEW_ENTRY](state, entry) {
    return {
      ...state,
      best: [ ...state.best, entry ],
    };
  },

  [FEED_BEST_RESET](state) {
    return {
      ...state,
      best: [],
    };
  },

  [FEED_FRIENDS_NEW_ENTRY](state, entry) {
    return {
      ...state,
      friends: [ ...state.friends, entry ],
    };
  },

  [FEED_FRIENDS_RESET](state) {
    return {
      ...state,
      friends: [],
    };
  },

  [FEED_ANONYMOUS_NEW_ENTRY](state, entry) {
    return {
      ...state,
      anonymous: [ ...state.anonymous, entry ],
    };
  },

  [FEED_ANONYMOUS_RESET](state) {
    return {
      ...state,
      anonymous: [],
    };
  },

  [FEED_LIVE_FLOW_NEW_ENTRY](state, entry) {
    return {
      ...state,
      liveFlow: [ ...state.liveFlow, entry ],
    };
  },

  [FEED_LIVE_FLOW_RESET](state) {
    return {
      ...state,
      liveFlow: [],
    };
  },
};

export default createReducer(initialState, actionMap);
