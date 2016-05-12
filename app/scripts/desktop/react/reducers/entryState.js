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
} from '../actions/CommentsActions';
import {
  COMMENT_POST_REQUEST,
  COMMENT_POST_SUCCESS,
  COMMENT_POST_FAILURE,
} from '../actions/CommentActions';
import {
  ENTRY_VOTE_REQUEST,
  ENTRY_VOTE_SUCCESS,
  ENTRY_VOTE_FAILURE,
} from '../actions/EntryActions';

const initialState = {};

const itemInitialState = {
  isFetching: false,
  error: null,
  isLoadingComments: false,
  isPostingComment: false,
  isVoting: false,
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

  [ENTRY_VOTE_REQUEST](state, { entryId }) {
    return Object.assign({}, state, entry(state, entryId, {
      isVoting: true,
    }));
  },
    
  [ENTRY_VOTE_SUCCESS](state, { entryId }) {
    return Object.assign({}, state, entry(state, entryId, {
      isVoting: false,
    }));
  },
    
  [ENTRY_VOTE_FAILURE](state, { entryId }) {
    return Object.assign({}, state, entry(state, entryId, {
      isVoting: false,
    }));
  },
  
};

export default createReducer(initialState, actionMap);
