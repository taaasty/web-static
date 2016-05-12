import { merge, omit } from 'lodash';
import {
  COMMENT_POST_SUCCESS,
  COMMENT_DELETE_SUCCESS,
} from '../actions/CommentActions';
import {
  ENTRY_FAVORITE_SUCCESS,
  ENTRY_UNFAVORITE_SUCCESS,
  ENTRY_WATCH_SUCCESS,
  ENTRY_UNWATCH_SUCCESS,
} from '../actions/EntryActions';

const initialState = {
  tlog: {},
  rel: {},
  calendar: {},
  calendarPeriod: {},
  marker: {},
  flow: {},
  flowCollItem: {},
  staff: {},
  comment: {},
  entry: {},
  entryCollItem: {},
  message: {},
  notification: {},
  conversation: {},
};

function handleEntities(state=initialState, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }

  return state;
}

function handleExtra(state, action) {
  switch (action.type) {
  case COMMENT_DELETE_SUCCESS:
    if (action.commentId) {
      const comment = state.comment[action.commentId];

      if (comment) {
        const entry = state.entry[comment.entryId] || {};

        return merge(Object.assign({}, state, {
          comment: omit(state.comment, action.commentId),
        }), entry ? { entry: { [entry.id]: { commentsCount: entry.commentsCount - 1 } } } : {});
      }
    }
    break;
  case COMMENT_POST_SUCCESS:
    if (action.entryId) {
      const entry = state.entry[action.entryId] || {};

      return merge({}, state, {
        entry: { [action.entryId]: { commentsCount: entry.commentsCount + 1 } },
      });
    }
    break;
  case ENTRY_FAVORITE_SUCCESS:
    if (action.entryId) {
      return merge({}, state, { entry: { [action.entryId]: { isFavorited: true } } });
    }
    break;
  case ENTRY_UNFAVORITE_SUCCESS:
    if (action.entryId) {
      return merge({}, state, { entry: { [action.entryId]: { isFavorited: false } } });
    }
    break;
  case ENTRY_WATCH_SUCCESS:
    if (action.entryId) {
      return merge({}, state, { entry: { [action.entryId]: { isWatching: true } } });
    }
    break;
  case ENTRY_UNWATCH_SUCCESS:
    if (action.entryId) {
      return merge({}, state, { entry: { [action.entryId]: { isWatching: false } } });
    }
    break;
  }

  return state;
}

export default function entities(state, action) {
  return handleExtra(handleEntities(state, action), action);
}
