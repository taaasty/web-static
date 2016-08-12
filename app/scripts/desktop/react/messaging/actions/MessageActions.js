import { escape } from 'lodash';
import ApiRoutes from '../../../../shared/routes/api';
import { CALL_API, Schemas } from '../../middleware/api';
import { NORMALIZE_DATA } from '../../middleware/normalize';
import { BEEP } from '../../middleware/beep';
import { postOpts } from '../../actions/reqHelpers';
import {
  cancelReplyTo,
} from './ThreadActions';
import {
  MSG_SOUND_SUBMIT,
} from '../constants';
import {
  generate as generateUuid,
} from '../../../../shared/react/services/uuid';

export const MSG_MESSAGE_POST_REQUEST = 'MSG_MESSAGE_POST_REQUEST';
export const MSG_MESSAGE_POST_SUCCESS = 'MSG_MESSAGE_POST_SUCCESS';
export const MSG_MESSAGE_POST_FAILURE = 'MSG_MESSAGE_POST_FAILURE';

export const MSG_MESSAGE_SUBMIT = 'MSG_MESSAGE_SUBMIT';

function submitMessage(uuid, params) {
  return (dispatch) => {
    const {
      conversation,
      content,
      files,
      replyMessage,
    } = params;
    const data = {
      content,
      uuid,
      files,
      replyMessage: replyMessage.get('uuid'),
      contentHtml: escape(content),
      conversationId: conversation.get('id'),
      recipientId: conversation.get('recipientId'),
      submittedAt: (new Date())
        .toString(),
      userId: conversation.get('userId'),
    };

    dispatch(cancelReplyTo());

    return dispatch({
      [BEEP]: {
        src: MSG_SOUND_SUBMIT,
      },
      [NORMALIZE_DATA]: {
        type: MSG_MESSAGE_SUBMIT,
        schema: Schemas.MESSAGE,
        options: { dontCamelize: true },
        data,
      },
    });
  };
}

function postMessage(uuid, params) {
  return (dispatch) => {
    const {
      conversation,
      content,
      files,
      replyMessage,
    } = params;
    const conversationId = conversation.get('id');
    const formData = new FormData();

    formData.append('content', content);
    formData.append('uuid', uuid);
    files.forEach((file) => formData.append('files[]', file));
    if (replyMessage.get('uuid')) {
      formData.append('reply_message_uuid', replyMessage.get('uuid'));
    }

    return dispatch({
      [CALL_API]: {
        endpoint: ApiRoutes.messenger_new_message_url(conversationId),
        schema: Schemas.MESSAGE,
        types: [
          MSG_MESSAGE_POST_REQUEST,
          MSG_MESSAGE_POST_SUCCESS,
          MSG_MESSAGE_POST_FAILURE,
        ],
        opts: postOpts(formData),
      },
      conversationId,
      uuid,
    });
  };
}

export function resendMessage(uuid, params) {
  return postMessage(uuid, params);
}

export function postNewMessage(params) {
  return (dispatch) => {
    const uuid = generateUuid();

    dispatch(submitMessage(uuid, params));
    return dispatch(postMessage(uuid, params));
  };
}


/*
markAsReadMessage(conversationId, messageId) {
  return this.requester.markAsReadMessage(conversationId, messageId)
    .fail((errMsg) => {
      console.error('Проблема при прочтении сообщения', errMsg);
    });
}

  readMessage(conversationId, messageId) {
    MessagingDispatcher.markAsReadMessage(conversationId, messageId);
    messagingService.markAsReadMessage(conversationId, messageId);
  },

  resendMessage({ conversationId, content, files, uuid, replyMessage }) {
    messagingService.postMessage({
      conversationId,
      content,
      files,
      uuid,
      replyMessage
    });
  },
*/
