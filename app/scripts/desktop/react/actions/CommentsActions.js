import ApiRoutes from '../../../shared/routes/api';
import { makeGetUrl, defaultOpts } from './reqHelpers';
import { CALL_API, Schemas } from '../middleware/api';

export const COMMENTS_REQUEST = 'COMMENTS_REQUEST';
export const COMMENTS_SUCCESS = 'COMMENTS_SUCCESS';
export const COMMENTS_FAILURE = 'COMMENTS_FAILURE';

export const COMMENTS_ENTRIES_REQUEST = 'COMMENTS_ENTRIES_REQUEST';
export const COMMENTS_ENTRIES_SUCCESS = 'COMMENTS_ENTRIES_SUCCESS';
export const COMMENTS_ENTRIES_FAILURE = 'COMMENTS_ENTRIES_FAILURE';

export const BY_ENTRIES_LIMIT = 5;

function fetchComments({ entryId }, endpoint) {
  return {
    [CALL_API]: {
      endpoint,
      schema: Schemas.COMMENT_COLL,
      types: [COMMENTS_REQUEST, COMMENTS_SUCCESS, COMMENTS_FAILURE],
      opts: defaultOpts,
    },
    entryId,
  };
}

export function loadComments(params) {
  const endpoint = makeGetUrl(ApiRoutes.comments_url(), params);

  return fetchComments(params, endpoint);
}

export function getTlogEntriesCommentsIfNeeded(entries) {
  return (dispatch, getState) => {
    const { entryState } = getState();
    const fEntries = entries
      .filterNot((e) => entryState[e.get('id')] && entryState[e.get('id')].isFetchingComments);

    return fEntries.count() > 0 && dispatch({
      [CALL_API]: {
        endpoint: makeGetUrl(ApiRoutes.commentsByEntriesIds(), {
          entriesIds: fEntries
            .keySeq()
            .join(','),
          limit: BY_ENTRIES_LIMIT,
        }),
        schema: Schemas.COMMENT_COLL_ARR,
        types: [
          COMMENTS_ENTRIES_REQUEST,
          COMMENTS_ENTRIES_SUCCESS,
          COMMENTS_ENTRIES_FAILURE,
        ],
        opts: defaultOpts,
      },
      entries: fEntries,
    });
  };
}
