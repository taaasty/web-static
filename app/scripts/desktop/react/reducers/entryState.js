import createReducer from './createReducer';
import {
  TLOG_ENTRY_REQUEST,
  TLOG_ENTRY_SUCCESS,
  TLOG_ENTRY_FAILURE,
} from '../actions/TlogEntryActions';
import {
  TLOG_ENTRIES_PERMISSIONS_REQUEST,
  TLOG_ENTRIES_PERMISSIONS_SUCCESS,
  TLOG_ENTRIES_PERMISSIONS_FAILIRE,
} from '../actions/TlogEntriesActions';
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
  isFetchingComments: false,
  isFetchingPermissions: false,
  isPostingComment: false,
};

function entryValue(state, id, update) {
  return Object.assign({}, state[id] || itemInitialState, update);
}

function entry(state, id, update) {
  return {
    [id]: entryValue(state, id, update),
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
      isFetchingComments: true,
    }));
  },

  [COMMENTS_SUCCESS](state, { entryId }) {
    return Object.assign({}, state, entry(state, entryId, {
      isFetchingComments: false,
    }));
  },

  [COMMENTS_FAILURE](state, { entryId }) {
    return Object.assign({}, state, entry(state, entryId, {
      isFetchingComments: false,
    }));
  },

  [COMMENTS_ENTRIES_REQUEST](state, { entries }) {
    return Object.assign({},
      state,
      entries.map((e, id) => entryValue(state, id, {
        isFetchingComments: true,
      }))
      .toJS()
    );
  },

  [COMMENTS_ENTRIES_SUCCESS](state, { entries }) {
    return Object.assign({},
      state,
      entries.map((e, id) => entryValue(state, id, {
        isFetchingComments: false,
      }))
      .toJS()
    );
  },

  [COMMENTS_ENTRIES_FAILURE](state, { entries }) {
    return Object.assign({},
      state,
      entries.map((e, id) => entryValue(state, id, {
        isFetchingComments: false,
      }))
      .toJS()
    );
  },

  [TLOG_ENTRIES_PERMISSIONS_REQUEST](state, { entries }) {
    return Object.assign({},
      state,
      entries.map((e, id) => entryValue(state, id, {
        isFetchingPermissions: true,
      }))
      .toJS()
    );
  },

  [TLOG_ENTRIES_PERMISSIONS_SUCCESS](state, { entries }) {
    return Object.assign({},
      state,
      entries.map((e, id) => entryValue(state, id, {
        isFetchingPermissions: false,
      }))
      .toJS()
    );
  },

  [TLOG_ENTRIES_PERMISSIONS_FAILIRE](state, { entries }) {
    return Object.assign({},
      state,
      entries.map((e, id) => entryValue(state, id, {
        isFetchingPermissions: false,
      }))
      .toJS()
    );
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
