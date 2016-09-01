import createReducer from './createReducer';
import {
  TLOG_ENTRY_REQUEST,
  TLOG_ENTRY_SUCCESS,
  TLOG_ENTRY_FAILURE,
} from '../actions/TlogEntryActions';
import {
  COMMENTS_REQUEST,
  COMMENTS_SUCCESS,
  COMMENTS_FAILURE,
  COMMENTS_ENTRIES_REQUEST,
  COMMENTS_ENTRIES_SUCCESS,
  COMMENTS_ENTRIES_FAILURE,
} from '../actions/CommentsActions';
import {
  COMMENT_POST_REQUEST,
  COMMENT_POST_SUCCESS,
  COMMENT_POST_FAILURE,
} from '../actions/CommentActions';

const initialState = {};

const itemInitialState = {
  isFetching: false,
  error: null,
  isLoadingComments: false,
  isPostingComment: false,
};

function entry(state, id, update) {
  return {
    [id]: Object.assign({}, state[id] || itemInitialState, update),
  };
}

const actionMap = {
  [TLOG_ENTRY_REQUEST](state, { entryId }) {
    return Object.assign({}, state, entry(state, entryId, {
      isFetching: true,
      error: null,
    }));
  },

  [TLOG_ENTRY_SUCCESS](state, { entryId }) {
    return Object.assign({}, state, entry(state, entryId, {
      isFetching: false,
      error: null,
    }));
  },

  [TLOG_ENTRY_FAILURE](state, { entryId, error }) {
    return Object.assign({}, state, entry(state, entryId, {
      isFetching: false,
      error,
    }));
  },

  [COMMENTS_REQUEST](state, { entryId }) {
    return Object.assign({}, state, entry(state, entryId, {
      isLoadingComments: true,
    }));
  },

  [COMMENTS_SUCCESS](state, { entryId }) {
    return Object.assign({}, state, entry(state, entryId, {
      isLoadingComments: false,
    }));
  },

  [COMMENTS_FAILURE](state, { entryId }) {
    return Object.assign({}, state, entry(state, entryId, {
      isLoadingComments: false,
    }));
  },

  [COMMENTS_ENTRIES_REQUEST](state, { entries }) {
    return Object.assign({}, state, entries.map((e, id) => entry(state, id, {
        isLoadingComments: true,
      }))
      .toJS());
  },

  [COMMENTS_ENTRIES_SUCCESS](state, { entries }) {
    return Object.assign({}, state, entries.map((e, id) => entry(state, id, {
        isLoadingComments: false,
      }))
      .toJS());
  },

  [COMMENTS_ENTRIES_FAILURE](state, { entries }) {
    return Object.assign({}, state, entries.map((e, id) => entry(state, id, {
        isLoadingComments: false,
      }))
      .toJS());
  },

  [COMMENT_POST_REQUEST](state, { entryId }) {
    return Object.assign({}, state, entry(state, entryId, {
      isPostingComment: true,
    }));
  },

  [COMMENT_POST_SUCCESS](state, { entryId }) {
    return Object.assign({}, state, entry(state, entryId, {
      isPostingComment: false,
    }));
  },

  [COMMENT_POST_FAILURE](state, { entryId }) {
    return Object.assign({}, state, entry(state, entryId, {
      isPostingComment: false,
    }));
  },
};

export default createReducer(initialState, actionMap);
