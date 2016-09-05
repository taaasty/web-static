import { CALL_API, Schemas } from '../middleware/api';
import ApiRoutes from '../../../shared/routes/api';
import { postOpts } from './reqHelpers';

export const SUPPORT_SEND_REQUEST = 'SUPPORT_SEND_REQUEST';
export const SUPPORT_SEND_SUCCESS = 'SUPPORT_SEND_SUCCESS';
export const SUPPORT_SEND_FAILURE = 'SUPPORT_SEND_FAILURE';

export function sendSupportRequest(email, text) {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.supportRequest(),
      schema: Schemas.NONE,
      types: [
        SUPPORT_SEND_REQUEST,
        SUPPORT_SEND_SUCCESS,
        SUPPORT_SEND_FAILURE,
      ],
      opts: postOpts({ email, text }),
    },
  };
}
