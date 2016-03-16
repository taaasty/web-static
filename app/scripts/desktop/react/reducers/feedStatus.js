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

export const initialState = {
  live: [],
  unreadLiveCount: 0,
  best: [],
  unreadBestCount: 0,
  friends: [],
  unreadFriendsCount: 0,
  anonymous: [],
  unreadAnonymousCount: 0,
  liveFlow: [],
  unreadLiveFlowCount: 0,
};

const actionMap = {
  [FEED_LIVE_NEW_ENTRY](state, entry) {
    return {
      ...state,
      live: [ ...state.live, entry ],
      unreadLiveCount: state.unreadLiveCount + 1,
    };
  },

  [FEED_LIVE_RESET](state) {
    return {
      ...state,
      live: [],
      unreadLiveCount: 0,
    };
  },

  [FEED_BEST_NEW_ENTRY](state, entry) {
    return {
      ...state,
      best: [ ...state.best, entry ],
      unreadBestCount: state.unreadBestCount + 1,
    };
  },

  [FEED_BEST_RESET](state) {
    return {
      ...state,
      best: [],
      unreadBestCount: 0,
    };
  },

  [FEED_FRIENDS_NEW_ENTRY](state, entry) {
    return {
      ...state,
      friends: [ ...state.friends, entry ],
      unreadFriendsCount: state.unreadFriendsCount + 1,
    };
  },

  [FEED_FRIENDS_RESET](state) {
    return {
      ...state,
      friends: [],
      unreadFriendsCount: 0,
    };
  },

  [FEED_ANONYMOUS_NEW_ENTRY](state, entry) {
    return {
      ...state,
      anonymous: [ ...state.anonymous, entry ],
      unreadAnonymousCount: state.unreadAnonymousCount + 1,
    };
  },

  [FEED_ANONYMOUS_RESET](state) {
    return {
      ...state,
      anonymous: [],
      unreadAnonymousCount: 0,
    };
  },

  [FEED_LIVE_FLOW_NEW_ENTRY](state, entry) {
    return {
      ...state,
      liveFlow: [ ...state.liveFlow, entry ],
      unreadLiveFlowCount: state.unreadLiveFlowCount + 1,
    };
  },

  [FEED_LIVE_FLOW_RESET](state) {
    return {
      ...state,
      liveFlow: [],
      unreadLiveFlowCount: 0,
    };
  },
};

export default createReducer(initialState, actionMap);
