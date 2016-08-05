import ApiRoutes from '../../../../shared/routes/api';
import { postOpts } from '../../actions/reqHelpers';
import { CALL_API, Schemas } from '../../middleware/api';

export const MSG_TYPING_INIT = 'MSG_TYPING_INIT';
export const MSG_TYPING_CANCEL = 'MSG_TYPING_CANCEL';

export const MSG_TYPING_REQUEST = 'MSG_TYPING_REQUEST';
export const MSG_TYPING_SUCCESS = 'MSG_TYPING_SUCCESS';
export const MSG_TYPING_FAILURE = 'MSG_TYPING_FAILURE';



export function initTyping(data) {
  return (dispatch, getState) => {
    const state = getState();

    if (state.msg.typing.getIn([])) {

    } else {
      return dispatch()
    }
  };
}

function cancelTyping() {

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


/*
updateTyping(convId, userId) {
  const timeoutId = setTimeout(this.cancelTyping.bind(this, convId,
    userId), TYPING_CANCEL_INTERVAL);

  if (!_typing[convId]) {
    _typing[convId] = {
      [userId]: {
        timeoutId,
        eventAt: (new Date())
          .valueOf()
      }
    };
  } else {
    const userTyping = _typing[convId][userId];
    if (userTyping && userTyping.timeoutId) {
      clearTimeout(userTyping.timeoutId);
    }

    _typing[convId][userId] = {
      timeoutId,
      eventAt: (new Date())
        .valueOf()
    };
  }
},

cancelTyping(convId, userId) {
  const typing = _typing[convId];

  if (typing) {
    if (typing[userId] && typing[userId].timeoutId) {
      clearTimeout(typing[userId].timeoutId);
    }

    delete _typing[convId][userId];
    this.emitChange();
  }
},

*/
