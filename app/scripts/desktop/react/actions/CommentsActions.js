import ApiRoutes from '../../../shared/routes/api';
import { makeGetUrl, defaultOpts } from './reqHelpers';
import { CALL_API, Schemas } from '../middleware/api';

export const COMMENTS_REQUEST = 'COMMENTS_REQUEST';
export const COMMENTS_SUCCESS = 'COMMENTS_SUCCESS';
export const COMMENTS_FAILURE = 'COMMENTS_FAILURE';

function fetchComments({ entryId }, endpoint) {
  return {
    [CALL_API]: {
      endpoint,
      schema: Schemas.COMMENT_COLL,
      types: [ COMMENTS_REQUEST, COMMENTS_SUCCESS, COMMENTS_FAILURE ],
      opts: defaultOpts,
    },
    entryId,
  };
}

export function loadComments(params) {
  const endpoint = makeGetUrl(ApiRoutes.comments_url(), params);

  return fetchComments(params, endpoint);
}
