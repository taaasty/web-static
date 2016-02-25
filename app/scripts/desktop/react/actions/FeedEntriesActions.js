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
} from '../constants/FeedConstants';

export const FEED_ENTRIES_REQUEST = 'FEED_ENTRIES_REQUEST';
export const FEED_ENTRIES_RECEIVE = 'FEED_ENTRIES_RECEIVE';
export const FEED_ENTRIES_ERROR = 'FEED_ENTRIES_ERROR';
export const FEED_ENTRIES_RESET = 'FEED_ENTRIES_RESET';
export const FEED_ENTRIES_VIEW_STYLE = 'FEED_ENTRIES_VIEW_STYLE';

const INITIAL_LOAD_LIMIT = 30;

function feedEntriesReceive(data) {
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

function shouldFetchFeedEntries(state, { type, rating, sinceId }) {
  const { isFetching, type: cType, rating: cRating, sinceId: cSinceId } = state.feedEntries;

  return !isFetching &&
    (type !== cType || (cType === FEED_BEST && rating !== cRating) || (cSinceId && sinceId == null));
}
