import BaseStore from './_base';
import AppDispatcher from '../dispatchers/dispatcher';
import FeedConstants from '../constants/FeedConstants';

const unreadFeeds = {
  live: [],
  best: [],
};

const actionMap = {
  [FeedConstants.FEED_LIVE_NEW_ENTRY](payload) {
    unreadFeeds.live.push(payload);
  },

  [FeedConstants.FEED_BEST_NEW_ENTRY](payload) {
    unreadFeeds.best.push(payload);
  },
};

const FeedsStore = Object.assign(
  new BaseStore(),
  {
    getUnreadBestCount() {
      return unreadFeeds.best.length;
    },

    getUnreadLiveCount() {
      return unreadFeeds.live.length;
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
