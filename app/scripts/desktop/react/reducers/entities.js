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
import {
  STAFF_DELETE_SUCCESS,
} from '../actions/StaffActions';
import {
  CURRENT_USER_USERPIC,
} from '../actions/CurrentUserActions';
import {
  DESIGN_SAVE_SUCCESS,
} from '../actions/DesignActions';

export const INIT_SET_TLOG = 'INIT_SET_TLOG';

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
      const comment = state.getIn([ 'comment', String(action.commentId) ]);

      if (comment) {
        return state
          .deleteIn([ 'comment', String(action.commentId) ])
          .updateIn([ 'entry', String(comment.get('entryId', '')), 'commentsCount' ], (val) => val - 1);
      }
    }
    break;
  case COMMENT_POST_SUCCESS:
    if (action.entryId) {
      return state.updateIn([ 'entry', String(action.entryId), 'commentsCount' ], (val) => val + 1);
    }
    break;
  case ENTRY_FAVORITE_SUCCESS:
    if (action.entryId) {
      return state.setIn([ 'entry', String(action.entryId), 'isFavorited' ], true);
    }
    break;
  case ENTRY_UNFAVORITE_SUCCESS:
    if (action.entryId) {
      return state.setIn([ 'entry', String(action.entryId), 'isFavorited' ], false);
    }
    break;
  case ENTRY_WATCH_SUCCESS:
    if (action.entryId) {
      return state.setIn([ 'entry', String(action.entryId), 'isWatching' ], true);
    }
    break;
  case ENTRY_UNWATCH_SUCCESS:
    if (action.entryId) {
      return state.setIn([ 'entry', String(action.entryId), 'isWatching' ], false);
    }
    break;
  case STAFF_DELETE_SUCCESS:
    if (action.response && action.response.result) {
      return state.deleteIn([ 'staff', String(action.response.result) ]);
    }
    break;
  case INIT_SET_TLOG:
    return state.mergeIn([ 'tlog' ], { [String(action.tlogId)]: action.tlog });
  case CURRENT_USER_USERPIC:
    return state.mergeIn([ 'tlog', String(action.tlogId) ], { userpic: action.response.result });
  case DESIGN_SAVE_SUCCESS:
    return state.mergeIn([ 'tlog', String(action.tlogId) ], { design: action.response.result });
  }

  return state;
}

export default function entities(state, action) {
  return handleExtra(handleEntities(state, action), action);
}
