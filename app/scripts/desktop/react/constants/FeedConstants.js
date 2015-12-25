import keyMirror from 'react/lib/keyMirror';

export default keyMirror({
  FEED_LIVE_NEW_ENTRY: null,
  FEED_LIVE_RESET: null,
  FEED_LIVE_INITIAL_COUNT: null,
  FEED_BEST_NEW_ENTRY: null,
  FEED_BEST_RESET: null,
  FEED_BEST_INITIAL_COUNT: null,
  FEED_FRIENDS_NEW_ENTRY: null,
  FEED_FRIENDS_RESET: null,
  FEED_FRIENDS_INITIAL_COUNT: null,
  FEED_ANONYMOUS_NEW_ENTRY: null,
  FEED_ANONYMOUS_RESET: null,
  FEED_LIVE_FLOW_NEW_ENTRY: null,
  FEED_LIVE_FLOW_RESET: null,
});

export const FEED_TYPE_ANONYMOUS = 'anonymous';
export const FEED_TYPE_LIVE = 'live';
export const FEED_TYPE_FRIENDS = 'friends';
export const FEED_TYPE_BEST = 'best';
export const FEED_TYPE_LIVE_FLOW = 'live_flow_entries';
