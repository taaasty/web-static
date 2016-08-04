/*global i18n, gon */
/*eslint no-console: 0 */
import { CALL_API, Schemas } from '../../middleware/api';
import { postOpts } from '../../actions/reqHelpers';
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
import NoticeService from '../../services/Notice';

export const MSG_NOTIFY_READY_REQUEST = 'MSG_NOTIFY_READY_REQUEST';
export const MSG_NOTIFY_READY_SUCCESS = 'MSG_NOTIFY_READY_SUCCESS';
export const MSG_NOTIFY_READY_FAILURE = 'MSG_NOTIFY_READY_FAILURE';

export const MSG_PUSHER_RECONNECT = 'MSG_PUSHER_RECONNECT';

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
      case EVENT_UPDATE_CONVERSATION:
        //return MessagingDispatcher.updateConversation(data);
      case EVENT_PUSH_MESSAGE:
        //return MessagingDispatcher.messageReceived(data);
      case EVENT_UPDATE_MESSAGES:
        //return MessagingDispatcher.messagesUpdated(data);
      case EVENT_PUSH_NOTIFICATION:
        //return MessagingDispatcher.notificationReceived(data);
      case EVENT_UPDATE_NOTIFICATIONS:
        //return MessagingDispatcher.notificationsUpdated(data);
      case EVENT_DELETE_MESSAGES:
        //return MessagingDispatcher.deleteMessages(data);
      case EVENT_DELETE_USER_MESSAGES:
        //return MessagingDispatcher.deleteUserMessages(data);
      case EVENT_TYPING:
        //return MessagingDispatcher.typing(data);
      }
    });
  }
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
        // return dispatch(updateOnleneStatuses());
      })
      .catch((err) => {
        console.error('Error', err);
      });

  }
}
