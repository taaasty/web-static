import BaseStore from './BaseStore';
import AppDispatcher from '../dispatchers/dispatcher';
import FeedConstants from '../constants/FeedConstants';

let unreadFeeds = {
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
  [FeedConstants.FEED_INITIAL_COUNTS](payload) {
    unreadFeeds = { ...unreadFeeds, ...payload };
  },

  [FeedConstants.FEED_LIVE_NEW_ENTRY](payload) {
    unreadFeeds.live.push(payload);
  },

  [FeedConstants.FEED_LIVE_RESET](payload) {
    unreadFeeds.live = [];
    unreadFeeds.liveInitialCount = 0;
  },

  [FeedConstants.FEED_BEST_NEW_ENTRY](payload) {
    unreadFeeds.best.push(payload);
  },

  [FeedConstants.FEED_BEST_RESET](payload) {
    unreadFeeds.best = [];
    unreadFeeds.bestInitialCount = 0;
  },

  [FeedConstants.FEED_FRIENDS_NEW_ENTRY](payload) {
    unreadFeeds.friends.push(payload);
  },

  [FeedConstants.FEED_FRIENDS_RESET](payload) {
    unreadFeeds.friends = [];
    unreadFeeds.friendsInitialCount = 0;
  },

  [FeedConstants.FEED_ANONYMOUS_NEW_ENTRY](payload) {
    unreadFeeds.anonymous.push(payload);
  },

  [FeedConstants.FEED_ANONYMOUS_RESET](payload) {
    unreadFeeds.anonymous = [];
    unreadFeeds.anonymousInitialCount = 0;
  },

  [FeedConstants.FEED_LIVE_FLOW_NEW_ENTRY](payload) {
    unreadFeeds.liveFlow.push(payload);
  },

  [FeedConstants.FEED_LIVE_FLOW_RESET](payload) {
    unreadFeeds.liveFlow = [];
    unreadFeeds.liveFlowInitialCount = 0;
  },
};

const FeedsStore = Object.assign(
  new BaseStore(),
  {
    getUnreadBestCount() {
      const { best, bestInitialCount } = unreadFeeds;
      return bestInitialCount + best.length;
    },

    getUnreadLiveCount() {
      const { live, liveInitialCount } = unreadFeeds;
      return liveInitialCount + live.length;
    },

    getUnreadFriendsCount() {
      const { friends, friendsInitialCount } = unreadFeeds;
      return friendsInitialCount + friends.length;
    },

    getUnreadAnonymousCount() {
      const { anonymous, anonymousInitialCount } = unreadFeeds;
      return anonymousInitialCount + anonymous.length;
    },

    getUnreadLiveFlowCount() {
      const { liveFlow, liveFlowInitialCount } = unreadFeeds;
      return liveFlowInitialCount + liveFlow.length;
    },
  }
);

FeedsStore.dispatchToken = AppDispatcher.register((payload) => {
  const fn = actionMap[payload.action.type];
  if (!fn) {
    return;
  }

  fn(payload.action.payload);
  FeedsStore.emitChange();
});


export default FeedsStore;
