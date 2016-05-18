import { CALL_API, Schemas } from '../middleware/api';
import { defaultOpts, makeGetUrl } from './reqHelpers';
import { apiUrlMap } from '../constants/FeedConstants';

export const FEED_ENTRIES_REQUEST = 'FEED_ENTRIES_REQUEST';
export const FEED_ENTRIES_SUCCESS = 'FEED_ENTRIES_SUCCESS';
export const FEED_ENTRIES_FAILURE = 'FEED_ENTRIES_FAILURE';

export const FEED_ENTRIES_RESET = 'FEED_ENTRIES_RESET';
export const FEED_ENTRIES_VIEW_STYLE = 'FEED_ENTRIES_VIEW_STYLE';

function signature({ apiType='', rating='', section='', type='', query='' }) {
  return `${apiType}-${rating}-${section}-${type}-${query}`;
}

const INITIAL_LOAD_LIMIT = 30;

export function resetFeedEntries() {
  return { type: FEED_ENTRIES_RESET };
}

export function feedEntriesViewStyle(viewStyle) {
  return {
    type: FEED_ENTRIES_VIEW_STYLE,
    viewStyle,
  };
}

function fetchFeedEntries(endpoint, signature) {
  return {
    signature,
    [CALL_API]: {
      endpoint,
      types: [ FEED_ENTRIES_REQUEST, FEED_ENTRIES_SUCCESS, FEED_ENTRIES_FAILURE ],
      schema: Schemas.ENTRY_COLL,
      opts: defaultOpts,
    },
  };
}

function shouldFetchFeedEntries(state, params) {
  const { isFetching, signature: cSignature } = state.feedEntries;

  return !isFetching && signature(params) !== cSignature;
}

export function getFeedEntries(params, { limit=INITIAL_LOAD_LIMIT, sinceId, tillId }={}) {
  return (dispatch) => {
    const { apiType, rating, query } = params;
    const url = apiUrlMap[apiType];

    if (!url) {
      return null;
    }

    return dispatch(fetchFeedEntries(makeGetUrl(url, {
      limit,
      rating,
      sinceEntryId: sinceId,
      tillEntryId: tillId,
      q: query || void 0,
    }), signature(params)));
  };
}

export function getFeedEntriesIfNeeded(params) {
  return (dispatch, getState) => {
    if (shouldFetchFeedEntries(getState(), params)) {
      dispatch(resetFeedEntries());
      return dispatch(getFeedEntries(params));
    }
  };
}
