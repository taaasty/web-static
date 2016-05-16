import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { postOpts, putOpts, deleteOpts } from './reqHelpers';

export const ENTRY_VOTE_REQUEST = 'ENTRY_VOTE_REQUEST';
export const ENTRY_VOTE_SUCCESS = 'ENTRY_VOTE_SUCCESS';
export const ENTRY_VOTE_FAILURE = 'ENTRY_VOTE_FAILURE';

export function voteEntry(entryId) {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.votes_url(entryId),
      schema: Schemas.RATING,
      types: [ ENTRY_VOTE_REQUEST, ENTRY_VOTE_SUCCESS, ENTRY_VOTE_FAILURE ],
      opts: postOpts(),
    },
    entryId,
  };
}

export const ENTRY_FAVORITE_REQUEST = 'ENTRY_FAVORITE_REQUEST';
export const ENTRY_FAVORITE_SUCCESS = 'ENTRY_FAVORITE_SUCCESS';
export const ENTRY_FAVORITE_FAILURE = 'ENTRY_FAVORITE_FAILURE';

export function favoriteEntry(entryId) {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.favorites_url(),
      schema: Schemas.NONE,
      types: [ ENTRY_FAVORITE_REQUEST, ENTRY_FAVORITE_SUCCESS, ENTRY_FAVORITE_FAILURE ],
      opts: postOpts({ entryId }),
    },
    entryId,
  };
}

export const ENTRY_UNFAVORITE_REQUEST = 'ENTRY_UNFAVORITE_REQUEST';
export const ENTRY_UNFAVORITE_SUCCESS = 'ENTRY_UNFAVORITE_SUCCESS';
export const ENTRY_UNFAVORITE_FAILURE = 'ENTRY_UNFAVORITE_FAILURE';

export function unfavoriteEntry(entryId) {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.favorites_url(),
      schema: Schemas.NONE,
      types: [ ENTRY_UNFAVORITE_REQUEST, ENTRY_UNFAVORITE_SUCCESS, ENTRY_UNFAVORITE_FAILURE ],
      opts: deleteOpts({ entryId }),
    },
    entryId,
  };
}

export const ENTRY_WATCH_REQUEST = 'ENTRY_WATCH_REQUEST';
export const ENTRY_WATCH_SUCCESS = 'ENTRY_WATCH_SUCCESS';
export const ENTRY_WATCH_FAILURE = 'ENTRY_WATCH_FAILURE';

export function watchEntry(entryId) {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.watching_url(),
      schema: Schemas.NONE,
      types: [ ENTRY_WATCH_REQUEST, ENTRY_WATCH_SUCCESS, ENTRY_WATCH_FAILURE ],
      opts: postOpts({ entryId }),
    },
    entryId,
  };
}

export const ENTRY_UNWATCH_REQUEST = 'ENTRY_UNWATCH_REQUEST';
export const ENTRY_UNWATCH_SUCCESS = 'ENTRY_UNWATCH_SUCCESS';
export const ENTRY_UNWATCH_FAILURE = 'ENTRY_UNWATCH_FAILURE';

export function unwatchEntry(entryId) {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.watching_url(),
      schema: Schemas.NONE,
      types: [ ENTRY_UNWATCH_REQUEST, ENTRY_UNWATCH_SUCCESS, ENTRY_UNWATCH_FAILURE ],
      opts: deleteOpts({ entryId }),
    },
    entryId,
  };
}

export const ENTRY_REPORT_REQUEST = 'ENTRY_REPORT_REQUEST';
export const ENTRY_REPORT_SUCCESS = 'ENTRY_REPORT_SUCCESS';
export const ENTRY_REPORT_FAILURE = 'ENTRY_REPORT_FAILURE';

export function reportEntry(entryId) {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.report_url(entryId),
      schema: Schemas.NONE,
      types: [ ENTRY_REPORT_REQUEST, ENTRY_REPORT_SUCCESS, ENTRY_REPORT_FAILURE ],
      opts: postOpts(),
    },
    entryId,
  };
}

export const ENTRY_DELETE_REQUEST = 'ENTRY_DELETE_REQUEST';
export const ENTRY_DELETE_SUCCESS = 'ENTRY_DELETE_SUCCESS';
export const ENTRY_DELETE_FAILURE = 'ENTRY_DELETE_FAILURE';

export function deleteEntry(entryId, tlogId) {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.reposts_url(),
      schema: Schemas.NONE,
      types: [ ENTRY_DELETE_REQUEST, ENTRY_DELETE_SUCCESS, ENTRY_DELETE_FAILURE ],
      opts: deleteOpts({ entryId, tlogId }),
    },
    entryId,
    tlogId,
  };
}

export const ENTRY_REPOST_REQUEST = 'ENTRY_REPOST_REQUEST';
export const ENTRY_REPOST_SUCCESS = 'ENTRY_REPOST_SUCCESS';
export const ENTRY_REPOST_FAILURE = 'ENTRY_REPOST_FAILURE';

export function repostEntry(entryId, tlogId) {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.reposts_url(),
      schema: Schemas.NONE,
      types: [ ENTRY_REPOST_REQUEST, ENTRY_REPOST_SUCCESS, ENTRY_REPOST_FAILURE ],
      opts: postOpts({ entryId, tlogId }),
    },
    entryId,
    tlogId,
  };
/**
    return Api.entry.repost(entryID, tlogID)
      .then(() => {
        if (window.ga) {
          window.ga('send', 'event', 'UX', 'Repost');
        }
        NoticeService.notifySuccess(i18n.t('repost_entry_success'));
  */
}

export const ENTRY_ACCEPT_REQUEST = 'ENTRY_ACCEPT_REQUEST';
export const ENTRY_ACCEPT_SUCCESS = 'ENTRY_ACCEPT_SUCCESS';
export const ENTRY_ACCEPT_FAILURE = 'ENTRY_ACCEPT_FAILURE';

export function acceptEntry(acceptUrl) {
  return {
    [CALL_API]: {
      endpoint: acceptUrl,
      schema: Schemas.NONE,
      types: [ ENTRY_ACCEPT_REQUEST, ENTRY_ACCEPT_SUCCESS, ENTRY_ACCEPT_FAILURE ],
      opts: putOpts(),
    },
  };
}

export const ENTRY_DECLINE_REQUEST = 'ENTRY_DECLINE_REQUEST';
export const ENTRY_DECLINE_SUCCESS = 'ENTRY_DECLINE_SUCCESS';
export const ENTRY_DECLINE_FAILURE = 'ENTRY_DECLINE_FAILURE';

export function declineEntry(declineUrl) {
  return {
    [CALL_API]: {
      endpoint: declineUrl,
      schema: Schemas.NONE,
      types: [ ENTRY_DECLINE_REQUEST, ENTRY_DECLINE_SUCCESS, ENTRY_DECLINE_FAILURE ],
      opts: putOpts(),
    },
  };
}
