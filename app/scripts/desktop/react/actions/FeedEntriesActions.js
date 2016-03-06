/*global $ */
import ApiRoutes from '../../../shared/routes/api';
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
export const FEED_ENTRIES_RECEIVE = 'FEED_ENTRIES_RECEIVE';
export const FEED_ENTRIES_ERROR = 'FEED_ENTRIES_ERROR';
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
    sinceId: query.since_entry_id,
  };
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
    type: FEED_ENTRIES_RECEIVE,
    payload: data,
  };
}

function feedEntriesRequest() {
  return {
    type: FEED_ENTRIES_REQUEST,
  };
}

function feedEntriesReset() {
  return {
    type: FEED_ENTRIES_RESET,
  };
}

function feedEntriesError(error) {
  return {
    type: FEED_ENTRIES_ERROR,
    payload: error,
  };
}

export function feedEntriesViewStyle(style) {
  return {
    type: FEED_ENTRIES_VIEW_STYLE,
    payload: style,
  };
}

function fetchFeedEntries(url, data) {
  return $.ajax({ url, data })
    .fail((xhr) => {
      ErrorService.notifyErrorResponse('Загрузка фида', {
        method: 'fetchFeedEntries(url, data)',
        methodArguments: { url, data },
        response: xhr.responseJSON,
      });
    });
}

function shouldFetchFeedEntries(state, { apiType, rating, sinceId }) {
  const { isFetching, apiType: cApiType, rating: cRating, sinceId: cSinceId } = state.feedEntries;

  return !isFetching &&
    (apiType !== cApiType || (cApiType === FEED_ENTRIES_API_TYPE_BEST && rating !== cRating) || (cSinceId && sinceId == null));
}

function getFeedEntries({ apiType, rating, sinceId }) {
  return (dispatch) => {
    const url = apiUrlMap[apiType];

    if (!url) {
      return null;
    }

    dispatch(feedEntriesRequest());
    dispatch(feedEntriesReset());
    return fetchFeedEntries(url, { limit: INITIAL_LOAD_LIMIT, rating, since_entry_id: sinceId })
      .then((data) => dispatch(feedEntriesReceive({ data, apiType, rating, sinceId })))
      .fail((error) => dispatch(feedEntriesError({ error: error.responseJSON, apiType, rating, sinceId })));
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
    const { isFetching, apiType, rating, data: { next_since_entry_id } } = getState().feedEntries;

    if (isFetching) {
      return null;
    }

    const url = apiUrlMap[apiType];
    const params = {
      rating,
      limit: APPEND_LOAD_LIMIT,
      since_entry_id: next_since_entry_id,
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

export function prependFeedEntries() {
  return (dispatch, getState) => {
    const { isFetching, apiType, rating, data: { items  } } = getState().feedEntries;
    const firstId = items && items[0] && items[0].entry.id;

    if (isFetching || !firstId) {
      return null;
    }


    const url = apiUrlMap[apiType];
    const params = {
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
      .fail((error) => dispatch(tlogEntriesError({ error: error.responseJSON })));

  };
}
