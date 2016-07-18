import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { postOpts } from './reqHelpers';

export const CURRENT_USER_SETUP = 'CURRENT_USER_SETUP';
export const CURRENT_USER_REQUEST = 'CURRENT_USER_REQUEST';
export const CURRENT_USER_SUCCESS = 'CURRENT_USER_SUCCESS';
export const CURRENT_USER_FAILURE = 'CURRENT_USER_FAILURE';

export const CURRENT_USER_CONFIRM_EMAIL_CANCEL = 'CURRENT_USER_CONFIRM_EMAIL_CANCEL';
export const CURRENT_USER_STOP_FB_CROSSPOST = 'CURRENT_USER_STOP_FB_CROSSPOST';
export const CURRENT_USER_STOP_TWITTER_CROSSPOST = 'CURRENT_USER_STOP_TWITTER_CROSSPOST';

export function updateUserProfile(data) {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.update_profile_url(),
      schema: Schemas.TLOG,
      types: [ CURRENT_USER_REQUEST, CURRENT_USER_SUCCESS, CURRENT_USER_FAILURE ],
      opts: postOpts(data),
    },
  };
}
