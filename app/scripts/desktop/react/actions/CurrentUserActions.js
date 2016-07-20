import ApiRoutes from '../../../shared/routes/api';
import ApiHelpers from '../../../shared/helpers/api';
import { CALL_API, Schemas } from '../middleware/api';
import { postOpts, putOpts, deleteOpts } from './reqHelpers';

export const CURRENT_USER_SETUP = 'CURRENT_USER_SETUP';
export const CURRENT_USER_REQUEST = 'CURRENT_USER_REQUEST';
export const CURRENT_USER_SUCCESS = 'CURRENT_USER_SUCCESS';
export const CURRENT_USER_FAILURE = 'CURRENT_USER_FAILURE';

export const CURRENT_USER_USERPIC = 'CURRENT_USER_USERPIC';

export const CURRENT_USER_CONFIRM_EMAIL_REQUEST = 'CURRENT_USER_CONFIRM_EMAIL_REQUEST';
export const CURRENT_USER_CONFIRM_EMAIL_CANCEL = 'CURRENT_USER_CONFIRM_EMAIL_CANCEL';
export const CURRENT_USER_CONFIRM_EMAIL_RESEND = 'CURRENT_USER_CONFIRM_EMAIL_RESEND';
export const CURRENT_USER_CONFIRM_EMAIL_FAILURE = 'CURRENT_USER_CONFIRM_EMAIL_FAILURE';

export const CURRENT_USER_STOP_FB_CROSSPOST = 'CURRENT_USER_STOP_FB_CROSSPOST';
export const CURRENT_USER_STOP_TWITTER_CROSSPOST = 'CURRENT_USER_STOP_TWITTER_CROSSPOST';

function currentUserId(state) {
  return state.currentUser.data.id;
}

export function updateUserProfile(data) {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.update_profile_url(),
      schema: Schemas.TLOG,
      types: [ CURRENT_USER_REQUEST, CURRENT_USER_SUCCESS, CURRENT_USER_FAILURE ],
      opts: putOpts(data),
    },
  };
}

export function updateUserpic(userpic) {
  return (dispatch, getState) => {
    const tlogId = currentUserId(getState());

    return dispatch({
      [CALL_API]: {
        endpoint: ApiRoutes.userpic_url(),
        schema: Schemas.NONE,
        types: [ CURRENT_USER_REQUEST, CURRENT_USER_USERPIC, CURRENT_USER_FAILURE ],
        opts: postOpts(ApiHelpers.prepareFormData({ file: userpic })),
      },
      tlogId,
    });
  };
}

export function cancelEmailConfirmation() {
  return (dispatch, getState) => {
    const tlogId = currentUserId(getState());

    return dispatch({
      [CALL_API]: {
        endpoint: ApiRoutes.request_confirm_url(),
        schema: Schemas.NONE,
        types: [ CURRENT_USER_CONFIRM_EMAIL_REQUEST, CURRENT_USER_CONFIRM_EMAIL_CANCEL, CURRENT_USER_CONFIRM_EMAIL_FAILURE ],
        opts: deleteOpts(),
      },
      tlogId,
    });
  };
}

export function resendEmailConfirmation() {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.request_confirm_url(),
      schema: Schemas.NONE,
      types: [ CURRENT_USER_CONFIRM_EMAIL_REQUEST, CURRENT_USER_CONFIRM_EMAIL_RESEND, CURRENT_USER_CONFIRM_EMAIL_FAILURE ],
      opts: postOpts(),
    },
  };
}

export function stopFbCrosspost() {
  return (dispatch, getState) => {
    const tlogId = currentUserId(getState());

    return {
      [CALL_API]: {
        endpoint: ApiRoutes.fb_crosspost_url(),
        schema: Schemas.NONE,
        types: [CURRENT_USER_REQUEST, CURRENT_USER_STOP_FB_CROSSPOST, CURRENT_USER_FAILURE ],
        opts: deleteOpts(),
      },
      tlogId,
    };
  };
}

export function stopTwitterCrosspost() {
  return (dispatch, getState) => {
    const tlogId = currentUserId(getState());

    return {
      [CALL_API]: {
        endpoint: ApiRoutes.twitter_crosspost_url(),
        schema: Schemas.NONE,
        types: [CURRENT_USER_REQUEST, CURRENT_USER_STOP_TWITTER_CROSSPOST, CURRENT_USER_FAILURE ],
        opts: deleteOpts(),
      },
      tlogId,
    };
  };
}
