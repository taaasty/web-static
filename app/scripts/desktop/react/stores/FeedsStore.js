import BaseStore from './_base';
import AppDispatcher from '../dispatchers/dispatcher';
import FeedConstants from '../constants/FeedConstants';

const unreadFeeds = {
  live: [],
  liveInitialCount: 0,
  best: [],
  bestInitialCount: 0,
  friends: [],
  friendsInitialCount: 0,
};

const actionMap = {
  [FeedConstants.FEED_LIVE_NEW_ENTRY](payload) {
    unreadFeeds.live.push(payload);
  },

  [FeedConstants.FEED_LIVE_RESET](payload) {
    unreadFeeds.live = [];
  },

  [FeedConstants.FEED_LIVE_INITIAL_COUNT](payload) {
    unreadFeeds.liveInitialCount = payload;
  },

  [FeedConstants.FEED_BEST_NEW_ENTRY](payload) {
    unreadFeeds.best.push(payload);
  },

  [FeedConstants.FEED_BEST_RESET](payload) {
    unreadFeeds.best = [];
  },

  [FeedConstants.FEED_BEST_INITIAL_COUNT](payload) {
    unreadFeeds.bestInitialCount = payload;
  },

  [FeedConstants.FEED_FRIENDS_NEW_ENTRY](payload) {
    unreadFeeds.friends.push(payload);
  },

  [FeedConstants.FEED_FRIENDS_RESET](payload) {
    unreadFeeds.friends = [];
  },

  [FeedConstants.FEED_FRIENDS_INITIAL_COUNT](payload) {
    unreadFeeds.friendsInitialCount = payload;
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
