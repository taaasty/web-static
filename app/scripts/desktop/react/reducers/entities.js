import Immutable from 'immutable';
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

const initialState = Immutable.fromJS({
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
});

/**
* @param {Immutable.Map} state
* @param {Object} action
* @return {Immutable.Map}
*/

function handleEntities(state=initialState, action) {
  if (action.response && action.response.entities) {
    // TODO: additional processing for relationships from entries
    return state.mergeDeep(action.response.entities);
  }

  return state;
}

/**
* @param {Immutable.Map} state
* @param {Object} action
* @param {String} action.type
* @return {Immutable.Map}
*/

function handleExtra(state, action) {
  switch (action.type) {
  case COMMENT_DELETE_SUCCESS:
    if (action.commentId) {
      const comment = state.getIn([ 'comment', action.commentId.toString() ]);

      if (comment) {
        return state
          .deleteIn([ 'comment', action.commentId.toString() ])
          .updateIn([ 'entry', comment.get('entryId', '').toString(), 'commentsCount' ], (val) => val - 1);
      }
    }
    break;
  case COMMENT_POST_SUCCESS:
    if (action.entryId) {
      return state.updateIn([ 'entry', action.entryId.toString(), 'commentsCount' ], (val) => val + 1);
    }
    break;
  case ENTRY_FAVORITE_SUCCESS:
    if (action.entryId) {
      return state.setIn([ 'entry', action.entryId.toString(), 'isFavorited' ], true);
    }
    break;
  case ENTRY_UNFAVORITE_SUCCESS:
    if (action.entryId) {
      return state.setIn([ 'entry', action.entryId.toString(), 'isFavorited' ], false);
    }
    break;
  case ENTRY_WATCH_SUCCESS:
    if (action.entryId) {
      return state.setIn([ 'entry', action.entryId.toString(), 'isWatching' ], true);
    }
    break;
  case ENTRY_UNWATCH_SUCCESS:
    if (action.entryId) {
      return state.setIn([ 'entry', action.entryId.toString(), 'isWatching' ], false);
    }
    break;
  }

  return state;
}

export default function entities(state, action) {
  return handleExtra(handleEntities(state, action), action);
}
