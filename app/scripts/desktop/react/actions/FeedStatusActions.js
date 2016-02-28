export const FEED_LIVE_NEW_ENTRY = 'FEED_LIVE_NEW_ENTRY';
export const FEED_LIVE_RESET = 'FEED_LIVE_RESET';
export const FEED_BEST_NEW_ENTRY = 'FEED_BEST_NEW_ENTRY';
export const FEED_BEST_RESET = 'FEED_BEST_RESET';
export const FEED_FRIENDS_NEW_ENTRY = 'FEED_FRIENDS_NEW_ENTRY';
export const FEED_FRIENDS_RESET = 'FEED_FRIENDS_RESET';
export const FEED_ANONYMOUS_NEW_ENTRY = 'FEED_ANONYMOUS_NEW_ENTRY';
export const FEED_ANONYMOUS_RESET = 'FEED_ANONYMOUS_RESET';
export const FEED_LIVE_FLOW_NEW_ENTRY = 'FEED_LIVE_FLOW_NEW_ENTRY';
export const FEED_LIVE_FLOW_RESET = 'FEED_LIVE_FLOW_RESET';

export function feedLiveNewEntry(entry) {
  return {
    type: FEED_LIVE_NEW_ENTRY,
    payload: entry,
  };
}

export function feedLiveReset() {
  return {
    type: FEED_LIVE_RESET,
  };
}

export function feedBestNewEntry(entry) {
  return {
    type: FEED_BEST_NEW_ENTRY,
    payload: entry,
  };
}

export function feedBestReset() {
  return {
    type: FEED_BEST_RESET,
  };
}

export function feedFriendsNewEntry(entry) {
  return {
    type: FEED_FRIENDS_NEW_ENTRY,
    payload: entry,
  };
}

export function feedFriendsReset() {
  return {
    type: FEED_FRIENDS_RESET,
  };
}

export function feedAnonymousNewEntry(entry) {
  return {
    type: FEED_ANONYMOUS_NEW_ENTRY,
    payload: entry,
  };
}

export function feedAnonymousReset() {
  return {
    type: FEED_ANONYMOUS_RESET,
  };
}

export function feedLiveFlowNewEntry(entry) {
  return {
    type: FEED_LIVE_FLOW_NEW_ENTRY,
    payload: entry,
  };
}

export function feedLiveFlowReset() {
  return {
    type: FEED_LIVE_FLOW_RESET,
  };
}
