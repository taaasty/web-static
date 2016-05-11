import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { deleteOpts, postOpts, putOpts } from './reqHelpers';

export const COMMENT_REQUEST = 'COMMENT_REQUEST';
export const COMMENT_SUCCESS = 'COMMENT_SUCCESS';
export const COMMENT_FAILURE = 'COMMENT_FAILURE';

export const COMMENT_POST_REQUEST = 'COMMENT_POST_REQUEST';
export const COMMENT_POST_SUCCESS = 'COMMENT_POST_SUCCESS';
export const COMMENT_POST_FAILURE = 'COMMENT_POST_FAILURE';

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

export const COMMENT_UPDATE_REQUEST = 'COMMENT_UPDATE_REQUEST';
export const COMMENT_UPDATE_SUCCESS = 'COMMENT_UPDATE_SUCCESS';
export const COMMENT_UPDATE_FAILURE = 'COMMENT_UPDATE_FAILURE';

export function updateComment(commentId, text) {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.comments_edit_delete_url(commentId),
      schema: Schemas.COMMENT,
      types: [ COMMENT_UPDATE_REQUEST, COMMENT_UPDATE_SUCCESS, COMMENT_UPDATE_FAILURE ],
      opts: putOpts({ text }),
    },
    commentId,
  };
}

export const COMMENT_REPORT_REQUEST = 'COMMENT_REPORT_REQUEST';
export const COMMENT_REPORT_SUCCESS = 'COMMENT_REPORT_SUCCESS';
export const COMMENT_REPORT_FAILURE = 'COMMENT_REPORT_FAILURE';

export function reportComment(commentId) {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.comments_report_url(commentId),
      schema: Schemas.NONE,
      types: [ COMMENT_REPORT_REQUEST, COMMENT_REPORT_SUCCESS, COMMENT_REPORT_FAILURE ],
      opts: postOpts(),
    },
    commentId,
  };
}

export const COMMENT_DELETE_REQUEST = 'COMMENT_DELETE_REQUEST';
export const COMMENT_DELETE_SUCCESS = 'COMMENT_DELETE_SUCCESS';
export const COMMENT_DELETE_FAILURE = 'COMMENT_DELETE_FAILURE';

export function deleteComment(commentId) {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.comments_edit_delete_url(commentId),
      schema: Schemas.NONE,
      types: [ COMMENT_DELETE_REQUEST, COMMENT_DELETE_SUCCESS, COMMENT_DELETE_FAILURE ],
      opts: deleteOpts(),
    },
    commentId,
  };
}
