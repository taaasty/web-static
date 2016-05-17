import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import ErrorService from '../../../shared/react/services/Error';
import {
  FEED_ENTRIES_API_TYPE_LIVE,
  FEED_ENTRIES_API_TYPE_MEDIA,
  FEED_ENTRIES_API_TYPE_FLOWS,
  FEED_ENTRIES_API_TYPE_ANONYMOUS,
  FEED_ENTRIES_API_TYPE_BEST,
  FEED_ENTRIES_API_TYPE_FRIENDS,
  FEED_ENTRIES_API_TYPE_FRIENDS_MEDIA,
  feedTypeMap,
} from '../constants/FeedConstants';
import { ENTRY_PINNED_STATE } from '../constants/EntryConstants';

export const FEED_ENTRIES_REQUEST = 'FEED_ENTRIES_REQUEST';
export const FEED_ENTRIES_SUCCESS = 'FEED_ENTRIES_SUCCESS';
export const FEED_ENTRIES_FAILURE = 'FEED_ENTRIES_FAILURE';

export const FEED_ENTRIES_RESET = 'FEED_ENTRIES_RESET';
export const FEED_ENTRIES_VIEW_STYLE = 'FEED_ENTRIES_VIEW_STYLE';

export function feedDataByUri({ pathname, query }) {
  const { apiType, section, type } = feedTypeMap[pathname] || {};
  const rating = apiType === FEED_ENTRIES_API_TYPE_BEST ? (query.rating || 'excellent') : void 0;

  return {
    apiType,
    rating,
    section,
    type,
    query: query.q,
  };
}

function signature({ apiType, rating, section, type, query }) {
  return `${apiType}-${rating}-${section}-${type}-${query}`;
}

export const apiUrlMap = {
  [FEED_ENTRIES_API_TYPE_LIVE]: ApiRoutes.feedLiveTlogs(),
  [FEED_ENTRIES_API_TYPE_MEDIA]: ApiRoutes.feedMediaTlogs(),
  [FEED_ENTRIES_API_TYPE_FLOWS]: ApiRoutes.feedFlowsTlogs(),
  [FEED_ENTRIES_API_TYPE_ANONYMOUS]: ApiRoutes.feedAnonymousTlogs(),
  [FEED_ENTRIES_API_TYPE_BEST]: ApiRoutes.feedBestTlogs(),
  [FEED_ENTRIES_API_TYPE_FRIENDS]: ApiRoutes.feedFriendsTlogs(),
  [FEED_ENTRIES_API_TYPE_FRIENDS_MEDIA]: ApiRoutes.feedFriendsMediaTlogs(),
};

const INITIAL_LOAD_LIMIT = 30;
const APPEND_LOAD_LIMIT = 15;

export function filterFeedItems(items=[]) {
  const ids = [];
  const promos = [];
  const tmp = items.reduce((acc, el) => {
    if (!el || !el.entry) {
      return acc;
    }

    if (ids.indexOf(el.entry.id) > -1) {
      return acc;
    } else {
      ids.push(el.entry.id);
    }

    if (el.entry.fixed_state === ENTRY_PINNED_STATE) {
      return (promos.push(el), acc);
    }

    return (acc.push(el), acc);
  }, []);

  return promos.concat(tmp);
}

function feedEntriesReceive(data) {
  if (data.data && data.data.items && Array.isArray(data.data.items)) {
    data.data.items = filterFeedItems(data.data.items);
  }

  return {
    type: FEED_ENTRIES_SUCCESS,
    payload: data,
  };
}

function feedEntriesReset() {
  return {
    type: FEED_ENTRIES_RESET,
  };
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
      
    },
  }
  return $.ajax({ url, data })
    .fail((xhr) => {
      ErrorService.notifyErrorResponse('Загрузка фида', {
        method: 'fetchFeedEntries(url, data)',
        methodArguments: { url, data },
        response: xhr.responseJSON,
      });
    });
}

function shouldFetchFeedEntries(state, { apiType, rating, sinceId, query }) {
  const { isFetching, apiType: cApiType, rating: cRating,
          sinceId: cSinceId, query: cQuery } = state.feedEntries;

  return !isFetching &&
    (apiType !== cApiType || query !== cQuery ||
     (cApiType === FEED_ENTRIES_API_TYPE_BEST && rating !== cRating) ||
     (cSinceId && sinceId == null));
}

function getFeedEntries({ apiType, rating, sinceId, query }) {
  return (dispatch) => {
    const url = apiUrlMap[apiType];

    if (!url) {
      return null;
    }

    dispatch(feedEntriesRequest());
    dispatch(feedEntriesReset());
    return fetchFeedEntries(url, {
      limit: INITIAL_LOAD_LIMIT,
      rating,
      since_entry_id: sinceId || void 0,
      q: query || void 0,
    })
      .then((data) => dispatch(feedEntriesReceive({ data, apiType, rating, sinceId, query })))
      .fail((error) => dispatch(feedEntriesError({ error: error.responseJSON, apiType, rating, sinceId, query })));
  };
}

export function getFeedEntriesIfNeeded(location, force=false) {
  return (dispatch, getState) => {
    const params = feedDataByUri(location);

    if (force || shouldFetchFeedEntries(getState(), params)) {
      return dispatch(getFeedEntries(params));
    }
  };
}

export function appendFeedEntries() {
  return (dispatch, getState) => {
    const { isFetching, apiType, rating, query, data: { next_since_entry_id } } = getState().feedEntries;

    if (isFetching) {
      return null;
    }

    const url = apiUrlMap[apiType];
    const params = {
      rating,
      limit: APPEND_LOAD_LIMIT,
      q: query || void 0,
      since_entry_id: next_since_entry_id || void 0,
    };

    dispatch(feedEntriesRequest());
    return fetchFeedEntries(url, params)
      .then((data) => {
        const prevItems = getState().feedEntries.data.items;
        dispatch(feedEntriesReceive({ data: { ...data, items: prevItems.concat(data.items) } }));
        return data;
      })
      .fail((error) => dispatch(feedEntriesError({ error: error.responseJSON })));
  };
}

export function prependFeedEntries(limit=INITIAL_LOAD_LIMIT) {
  return (dispatch, getState) => {
    const { isFetching, apiType, rating, data: { items  } } = getState().feedEntries;
    const firstId = items && items[0] && items[0].entry.id;

    if (isFetching || !firstId) {
      return null;
    }


    const url = apiUrlMap[apiType];
    const params = {
      limit,
      rating,
      till_entry_id: firstId,
    };

    dispatch(feedEntriesRequest());
    return fetchFeedEntries(url, params)
      .then((data) => {
        const prevData = getState().feedEntries.data;
        dispatch(feedEntriesReceive({ data: { ...prevData, items: data.items.concat(prevData.items) } }));
        return data;
      })
      .fail((error) => dispatch(feedEntriesError({ error: error.responseJSON })));
  };
}
