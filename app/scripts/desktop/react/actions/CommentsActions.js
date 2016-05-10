import ApiRoutes from '../../../shared/routes/api';
import { makeReqUrl, headerOpts } from './helpers';
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
      opts: headerOpts,
    },
    entryId,
  };
}

export function loadComments(params) {
  const endpoint = makeReqUrl(ApiRoutes.comments_url(), params);

  return fetchComments(params, endpoint);
}
