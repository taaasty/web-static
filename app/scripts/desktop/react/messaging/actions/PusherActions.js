/*global i18n, gon */
/*eslint no-console: 0 */
import { CALL_API, Schemas } from '../../middleware/api';
import { NORMALIZE_DATA } from '../../middleware/normalize';
import { BEEP } from '../../middleware/beep';
import { postOpts } from '../../actions/reqHelpers';
import { camelizeKeys } from 'humps';
import Pusher from 'pusher';
import ApiRoutes from '../../../../shared/routes/api';
import {
  connectionStateProcess,
  connectionStateConnected,
  connectionStateError,
} from './ConnectionStateActions';
import {
  updateMessagingStatus,
} from './MessagingStatusActions';
import {
  initTyping,
} from './TypingActions';
import {
  MSG_SOUND_INCOMING,
} from '../constants';
import NoticeService from '../../services/Notice';
import { Map } from 'immutable';

export const MSG_NOTIFY_READY_REQUEST = 'MSG_NOTIFY_READY_REQUEST';
export const MSG_NOTIFY_READY_SUCCESS = 'MSG_NOTIFY_READY_SUCCESS';
export const MSG_NOTIFY_READY_FAILURE = 'MSG_NOTIFY_READY_FAILURE';

export const MSG_PUSHER_RECONNECT = 'MSG_PUSHER_RECONNECT';
export const MSG_PUSHER_PUSH_NOTIFICATION = 'MSG_PUSHER_PUSH_NOTIFICATION';
export const MSG_PUSHER_PUSH_CONVERSATION = 'MSG_PUSHER_PUSH_CONVERSATION';
export const MSG_PUSHER_UPDATE_NOTIFICATIONS =
  'MSG_PUSHER_UPDATE_NOTIFICATIONS';
export const MSG_PUSHER_PUSH_MESSAGE = 'MSG_PUSHER_PUSH_MESSAGE';

const EVENT_STATUS = 'status';
const EVENT_UPDATE_CONVERSATION = 'update_conversation';
const EVENT_PUSH_MESSAGE = 'push_message';
const EVENT_PUSH_NOTIFICATION = 'push_notification';
const EVENT_UPDATE_MESSAGES = 'update_messages';
const EVENT_UPDATE_NOTIFICATIONS = 'update_notifications';
const EVENT_DELETE_MESSAGES = 'delete_messages';
const EVENT_DELETE_USER_MESSAGES = 'delete_user_messages';
const EVENT_TYPING = 'typed';

function channelMain(userId) {
  return `private-${userId}-messaging`;
}

function pushNotification(data) {
  return {
    [BEEP]: {
      src: MSG_SOUND_INCOMING,
    },
    [NORMALIZE_DATA]: {
      schema: Schemas.NOTIFICATION,
      type: MSG_PUSHER_PUSH_NOTIFICATION,
      data,
    },
  };
}

function updateNotifications(data) {
  return {
    [NORMALIZE_DATA]: {
      schema: Schemas.NOTIFICATION_COLL,
      type: MSG_PUSHER_UPDATE_NOTIFICATIONS,
      data,
    },
  };
}

function pushConversation(data) {
  return {
    [NORMALIZE_DATA]: {
      schema: Schemas.CONVERSATION,
      type: MSG_PUSHER_PUSH_CONVERSATION,
      data,
    },
  };
}

function pushMessage(rawData) {
  return (dispatch, getState) => {
    const data = camelizeKeys(rawData);
    const conversation = getState()
      .entities
      .getIn(['conversation', String(data.conversationId)], Map());
    const doBeep = data.userId !== conversation.get('userId') &&
      !conversation.get('notDisturb');

    return dispatch({
      [BEEP]: {
        src: doBeep && MSG_SOUND_INCOMING,
      },
      [NORMALIZE_DATA]: {
        schema: Schemas.MESSAGE,
        type: MSG_PUSHER_PUSH_MESSAGE,
        data: rawData,
      },
    });
  };
}

export function pusherSubscribe(user) {
  return (dispatch) => {
    dispatch(connectionStateProcess());

    const pusher = new Pusher(gon.pusher.key, {
      authEndpoint: ApiRoutes.pusher_auth_url(),
      pong_timeout: 6000,
      unavailable_timeout: 2000,
      auth: {
        headers: {
          'X-User-Token': user.apiKey.accessToken,
        },
      },
    });
    const channel = pusher.subscribe(channelMain(user.id));

    channel.bind(
      'pusher:subscription_succeeded',
      () => dispatch(pusherConnected(pusher))
    );

    channel.bind(
      'pusher:subscription_error',
      () => {
        NoticeService.notify('error', i18n.t('pusher_subscription_error'));
        dispatch(connectionStateError());
      }
    );

    channel.bind_all((_type = '', data) => {
      const type = _type.replace(/^(public_|group_)/, '');

      switch (type) {
      case EVENT_STATUS:
        return dispatch(updateMessagingStatus(data));
      case EVENT_PUSH_NOTIFICATION:
        return dispatch(pushNotification(data));
      case EVENT_UPDATE_NOTIFICATIONS:
        return dispatch(updateNotifications(data));
      case EVENT_UPDATE_CONVERSATION:
        return dispatch(pushConversation(data));
      case EVENT_PUSH_MESSAGE:
        return dispatch(pushMessage(data));
      case EVENT_UPDATE_MESSAGES:
        //return MessagingDispatcher.messagesUpdated(data);
        return;
      case EVENT_DELETE_MESSAGES:
        //return MessagingDispatcher.deleteMessages(data);
        return;
      case EVENT_DELETE_USER_MESSAGES:
        //return MessagingDispatcher.deleteUserMessages(data);
        return;
      case EVENT_TYPING:
        return dispatch(initTyping(data));
      }
    });
  };
}

/*
function pusherReconnect(pusher, userId) {
  return (dispatch, getState) => {
    dispatch(connectionStateProcess());
    pusher.subscribe(channelMain(userId));
  }
}
*/

function notifyReady() {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.messenger_ready_url(),
      schema: Schemas.MESSENGER_READY,
      types: [
        MSG_NOTIFY_READY_REQUEST,
        MSG_NOTIFY_READY_SUCCESS,
        MSG_NOTIFY_READY_FAILURE,
      ],
      opts: postOpts(),
    },
  };
}

function pusherConnected(pusher) {
  return (dispatch) => {
    dispatch(connectionStateConnected());
    pusher.connection.bind(
      'unavailable',
      (error) => console.log('pusher unavailable', error)
    );
    pusher.connection.bind(
      'failed',
      (error) => console.log('pusher failed', error)
    );
    pusher.connection.bind(
      'connected',
      () => dispatch({ type: MSG_PUSHER_RECONNECT })
    );

    return dispatch(notifyReady())
      .then(() => {
        console.log('Server is notified');
        // TODO: return dispatch(updateOnleneStatuses());
      })
      .catch((err) => {
        console.error('Error', err);
      });

  };
}
