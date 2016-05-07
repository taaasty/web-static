export const COMMENTS_REQUEST = 'COMMENTS_REQUEST';
export const COMMENTS_SUCCESS = 'COMMENTS_SUCCESS';
export const COMMENTS_FAILURE = 'COMMENTS_FAILURE';

function fetchComments(endpoint) {
  return {
    [CALL_API]: {
      endpoint,
      schema: Schemas.COMMENT_COLL,
      types: [ COMMENTS_REQUEST, COMMENTS_SUCCESS, COMMENTS_FAILURE ],
      opts: auth,
    },
  };
}

export function getComments(entryId, params) {
  const endpoint = makeReqUrl(ApiRoutes.comments_url(entryId), params);

  return fetchComments(endpoint);
}
