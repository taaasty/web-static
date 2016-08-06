import ApiRoutes from '../../../../shared/routes/api';
import { postOpts } from '../../actions/reqHelpers';
import { CALL_API, Schemas } from '../../middleware/api';
import { camelizeKeys } from 'humps';
import {
  TYPING_CANCEL_INTERVAL,
} from '../constants';

export const MSG_TYPING_INIT = 'MSG_TYPING_INIT';
export const MSG_TYPING_CANCEL = 'MSG_TYPING_CANCEL';

export const MSG_TYPING_REQUEST = 'MSG_TYPING_REQUEST';
export const MSG_TYPING_SUCCESS = 'MSG_TYPING_SUCCESS';
export const MSG_TYPING_FAILURE = 'MSG_TYPING_FAILURE';

export function initTyping(rawData) {
  return (dispatch) => {
    const data = camelizeKeys(rawData);

    if (typeof setTimeout === 'function') {
      setTimeout(() => dispatch(cancelTyping(data)), TYPING_CANCEL_INTERVAL);
    }

    return dispatch({
      type: MSG_TYPING_INIT,
      data,
    });
  };
}

function cancelTyping(data) {
  return {
    type: MSG_TYPING_CANCEL,
    data,
  };
}

export function sendTyping(conversationId) {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.messengerTyping(conversationId),
      schema: Schemas.NONE,
      types: [
        MSG_TYPING_REQUEST,
        MSG_TYPING_SUCCESS,
        MSG_TYPING_FAILURE,
      ],
      opts: postOpts(),
    },
  };
}
