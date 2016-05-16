import { Map } from 'immutable';
import {
  COMMENT_UPDATE_REQUEST,
  COMMENT_UPDATE_SUCCESS,
  COMMENT_UPDATE_FAILURE,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  COMMENT_DELETE_FAILURE,
  COMMENT_REPORT_REQUEST,
  COMMENT_REPORT_SUCCESS,
  COMMENT_REPORT_FAILURE,
} from '../actions/CommentActions';

export default function commentState(state=Map(), { type, commentId }) {
  if (!commentId) {
    return state;
  }

  switch (type) {
  case COMMENT_UPDATE_REQUEST:
  case COMMENT_DELETE_REQUEST:
  case COMMENT_REPORT_REQUEST:
    return state.setIn([ commentId, 'isProcessing' ], true);
    break;
  case COMMENT_UPDATE_SUCCESS:
  case COMMENT_DELETE_SUCCESS:
  case COMMENT_REPORT_SUCCESS:
  case COMMENT_UPDATE_FAILURE:
  case COMMENT_DELETE_FAILURE:
  case COMMENT_REPORT_FAILURE:
    return state.setIn([ commentId, 'isProcessing' ], false);
    break;
  }

  return state;
}
