import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { postOpts } from './helpers';

export const COMMENT_POST_REQUEST = 'COMMENT_POST_REQUEST';
export const COMMENT_POST_SUCCESS = 'COMMENT_POST_SUCCESS';
export const COMMENT_POST_FAILURE = 'COMMENT_POST_FAILURE';

export const COMMENT_DELETE_REQUEST = 'COMMENT_DELETE_REQUEST';
export const COMMENT_DELETE_SUCCESS = 'COMMENT_DELETE_SUCCESS';

export const COMMENT_UPDATE_REQUEST = 'COMMENT_UPDATE_REQUEST';
export const COMMENT_UPDATE_SUCCESS = 'COMMENT_UPDATE_SUCCESS';

export const COMMENT_REPORT_REQUEST = 'COMMENT_REPORT_REQUEST';
export const COMMENT_REPORT_SUCCESS = 'COMMENT_REPORT_SUCCESS';

export const COMMENT_REQUEST = 'COMMENT_REQUEST';
export const COMMENT_SUCCESS = 'COMMENT_SUCCESS';
export const COMMENT_FAILURE = 'COMMENT_FAILURE';

export function postComment(entryId, text) {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.comments_url(),
      schema: Schemas.COMMENT,
      types: [ COMMENT_POST_REQUEST, COMMENT_POST_SUCCESS, COMMENT_POST_FAILURE ],
      opts: postOpts({ text, entryId }),
    },
    entryId,
  };
}

export function updateComment() {
  /**
      url = ApiRoutes.comments_edit_delete_url(commentID)
      data = { text }
  put
  */
}

export function reportComment() {
  /**
      url = ApiRoutes.comments_report_url(commentID)
  post
   */
}

export function deleteComment() {
  /**
      url = ApiRoutes.comments_edit_delete_url(commentID)

      _pendingRequests[key] = deleteRequest url
   */
}
