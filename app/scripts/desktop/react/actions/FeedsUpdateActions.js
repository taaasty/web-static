import AppDispatcher from '../dispatchers/dispatcher';
import FeedConstants from '../constants/FeedConstants';

export function addLiveEntry(entry) {
  AppDispatcher.handleServerAction({
    payload: entry,
    type: FeedConstants.FEED_LIVE_NEW_ENTRY,
  });
}

export function resetLiveEntries() {
  AppDispatcher.handleViewAction({
    type: FeedConstants.FEED_LIVE_RESET,
  });
}

export function addBestEntry(entry) {
  AppDispatcher.handleServerAction({
    payload: entry,
    type: FeedConstants.FEED_BEST_NEW_ENTRY,
  });
}

export function resetBestEntries() {
  AppDispatcher.handleViewAction({
    type: FeedConstants.FEED_BEST_RESET,
  });
}

export function addFriendsEntry(entry) {
  AppDispatcher.handleServerAction({
    payload: entry,
    type: FeedConstants.FEED_FRIENDS_NEW_ENTRY,
  });
}

export function resetFriendsEntries() {
  AppDispatcher.handleViewAction({
    type: FeedConstants.FEED_FRIENDS_RESET,
  });
}

export function addAnonymousEntry() {
  AppDispatcher.handleViewAction({
    type: FeedConstants.FEED_ANONYMOUS_NEW_ENTRY,
  });
}

export function resetAnonymousEntries() {
  AppDispatcher.handleViewAction({
    type: FeedConstants.FEED_ANONYMOUS_RESET,
  });
}

export function addLiveFlowEntry() {
  AppDispatcher.handleViewAction({
    type: FeedConstants.FEED_LIVE_FLOW_NEW_ENTRY,
  });
}

export function resetLiveFlowEntries() {
  AppDispatcher.handleViewAction({
    type: FeedConstants.FEED_LIVE_FLOW_RESET,
  });
}
