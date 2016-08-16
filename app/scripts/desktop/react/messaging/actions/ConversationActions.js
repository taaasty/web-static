import { CALL_API, Schemas } from '../../middleware/api';
import ApiRoutes from '../../../../shared/routes/api';
import {
  defaultOpts,
  postOpts,
  putOpts,
  deleteOpts,
  makeGetUrl,
} from '../../actions/reqHelpers';
import { Map } from 'immutable';
import moment from 'moment';

const ARCHIVED_MESSAGES_LIMIT = 10;
const UPDATE_ONLINE_STATUSES_TIMEOUT = 10 * 60 * 1000; // 10 minutes

export const MSG_CONVERSATION_POST_REQUEST = 'MSG_CONVERSATION_POST_REQUEST';
export const MSG_CONVERSATION_POST_SUCCESS = 'MSG_CONVERSATION_POST_SUCCESS';
export const MSG_CONVERSATION_POST_FAILURE = 'MSG_CONVERSATION_POST_FAILURE';

export const MSG_CONVERSATION_MSGS_REQUEST = 'MSG_CONVERSATION_MSGS_REQUEST';
export const MSG_CONVERSATION_MSGS_SUCCESS = 'MSG_CONVERSATION_MSGS_SUCCESS';
export const MSG_CONVERSATION_MSGS_FAILURE = 'MSG_CONVERSATION_MSGS_FAILURE';

export const MSG_CONVERSATION_LEAVE_REQUEST = 'MSG_CONVERSATION_LEAVE_REQUEST';
export const MSG_CONVERSATION_LEAVE_SUCCESS = 'MSG_CONVERSATION_LEAVE_SUCCESS';
export const MSG_CONVERSATION_LEAVE_FAILURE = 'MSG_CONVERSATION_LEAVE_FAILURE';

export const MSG_CONVERSATION_ONLINE_REQUEST =
  'MSG_CONVERSATION_ONLINE_REQUEST';
export const MSG_CONVERSATION_ONLINE_SUCCESS =
  'MSG_CONVERSATION_ONLINE_SUCCESS';
export const MSG_CONVERSATION_ONLINE_FAILURE =
  'MSG_CONVERSATION_ONLINE_FAILURE';

export const MSG_CONVERSATION_DELETE_REQUEST =
  'MSG_CONVERSATION_DELETE_REQUEST';
export const MSG_CONVERSATION_DELETE_SUCCESS =
  'MSG_CONVERSATION_DELETE_SUCCESS';
export const MSG_CONVERSATION_DELETE_FAILURE =
  'MSG_CONVERSATION_DELETE_FAILURE';

export const MSG_CONVERSATION_DELETE_MSGS_REQUEST =
  'MSG_CONVERSATION_DELETE_MSGS_REQUEST';
export const MSG_CONVERSATION_DELETE_MSGS_SUCCESS =
  'MSG_CONVERSATION_DELETE_MSGS_SUCCESS';
export const MSG_CONVERSATION_DELETE_MSGS_FAILURE =
  'MSG_CONVERSATION_DELETE_MSGS_FAILURE';

export const MSG_CONVERSATION_DISTURB_REQUEST =
  'MSG_CONVERSATION_DISTURB_REQUEST';
export const MSG_CONVERSATION_DISTURB_SUCCESS =
  'MSG_CONVERSATION_DISTURB_SUCCESS';
export const MSG_CONVERSATION_DISTURB_FAILURE =
  'MSG_CONVERSATION_DISTURB_FAILURE';

export const MSG_CONVERSATION_MARK_ALL_READ_REQUEST =
  'MSG_CONVERSATION_MARK_ALL_READ_REQUEST';
export const MSG_CONVERSATION_MARK_ALL_READ_SUCCESS =
  'MSG_CONVERSATION_MARK_ALL_READ_SUCCESS';
export const MSG_CONVERSATION_MARK_ALL_READ_FAILURE =
  'MSG_CONVERSATION_MARK_ALL_READ_FAILURE';

export function postNewConversation(userId) {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.messengerConversationsByUserId(userId),
      schema: Schemas.CONVERSATION,
      types: [
        MSG_CONVERSATION_POST_REQUEST,
        MSG_CONVERSATION_POST_SUCCESS,
        MSG_CONVERSATION_POST_FAILURE,
      ],
      opts: postOpts(),
    },
  };
}

export function loadMessages(conversationId, data = {}) {
  return {
    [CALL_API]: {
      endpoint: makeGetUrl(
        ApiRoutes.messenger_load_messages_url(conversationId),
        data
      ),
      schema: Schemas.MESSAGE_COLL,
      types: [
        MSG_CONVERSATION_MSGS_REQUEST,
        MSG_CONVERSATION_MSGS_SUCCESS,
        MSG_CONVERSATION_MSGS_FAILURE,
      ],
      opts: defaultOpts,
    },
    conversationId,
  };
}

export function loadArchivedMessages(conversationId) {
  return (dispatch, getState) => {
    const state = getState();
    const conversation = state
      .entities
      .getIn(['conversation', String(conversationId)]);
    const messages = state
      .entities
      .get('message', Map())
      .filter((m) => m.get('conversationId') === conversationId && m.get(
        'createdAt'))
      .sortBy((m) => moment(m.get('createdAt'))
        .valueOf());
    const oldestMessage = messages.first();
    const hasMore = (
      messages.count() < conversation.get('messagesCount', +Infinity)
    );

    return hasMore && oldestMessage && dispatch(loadMessages(conversationId, {
      toMessageId: oldestMessage.get('id'),
      limit: ARCHIVED_MESSAGES_LIMIT,
    }));
  };
}

export function deleteMessages(conversationId, ids, everywhere = false) {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.messengerDeleteMessages(conversationId),
      schema: Schemas.NONE,
      types: [
        MSG_CONVERSATION_DELETE_MSGS_REQUEST,
        MSG_CONVERSATION_DELETE_MSGS_SUCCESS,
        MSG_CONVERSATION_DELETE_MSGS_FAILURE,
      ],
      opts: deleteOpts({
        ids: ids.join(','),
        all: !!everywhere,
      }),
    },
  };
}

export function leaveConversation(conversationId) {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.messengerConversationsByIdLeave(conversationId),
      schema: Schemas.NONE,
      types: [
        MSG_CONVERSATION_LEAVE_REQUEST,
        MSG_CONVERSATION_LEAVE_SUCCESS,
        MSG_CONVERSATION_LEAVE_FAILURE,
      ],
      opts: putOpts(),
    },
    conversationId,
  };
}

export function deleteConversation(conversationId) {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.messengerConversationsById(conversationId),
      schema: Schemas.NONE,
      types: [
        MSG_CONVERSATION_DELETE_REQUEST,
        MSG_CONVERSATION_DELETE_SUCCESS,
        MSG_CONVERSATION_DELETE_FAILURE,
      ],
      opts: deleteOpts(),
    },
    conversationId,
  };
}

export function dontDisturb(conversationId, flag) {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.messengerDontDisturb(conversationId),
      schema: Schemas.CONVERSATION,
      types: [
        MSG_CONVERSATION_DISTURB_REQUEST,
        MSG_CONVERSATION_DISTURB_SUCCESS,
        MSG_CONVERSATION_DISTURB_FAILURE,
      ],
      opts: flag ? postOpts() : deleteOpts(),
    },
  };
}

let osId = void 0;

export function updateOnlineStatuses() {
  return (dispatch, getState) => {
    const userIds = getState()
      .entities
      .get('conversation')
      .filter((c) => c.has('recipientId') && !!c.get('recipientId'))
      .map((c) => c.get('recipientId'))
      .join(',');

    if (osId && typeof clearTimeout === 'function') {
      clearTimeout(osId);
    }

    if (typeof setTimeout === 'function') {
      osId = setTimeout(
        () => dispatch(updateOnlineStatuses()),
        UPDATE_ONLINE_STATUSES_TIMEOUT
      );
    }

    return dispatch({
      [CALL_API]: {
        endpoint: makeGetUrl(ApiRoutes.onlineStatuses(), { userIds }),
        schema: Schemas.MESSAGE_COLL,
        types: [
          MSG_CONVERSATION_ONLINE_REQUEST,
          MSG_CONVERSATION_ONLINE_SUCCESS,
          MSG_CONVERSATION_ONLINE_FAILURE,
        ],
        opts: defaultOpts,
      },
    });
  };
}

export function markAllMessagesRead(conversationId) {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.messengerMarkAllMessagesRead(conversationId),
      schema: Schemas.NONE,
      types: [
        MSG_CONVERSATION_MARK_ALL_READ_REQUEST,
        MSG_CONVERSATION_MARK_ALL_READ_SUCCESS,
        MSG_CONVERSATION_MARK_ALL_READ_FAILURE,
      ],
      opts: putOpts(),
    },
    conversationId,
  };
}
