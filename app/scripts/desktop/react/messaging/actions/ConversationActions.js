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

const ARCHIVED_MESSAGES_LIMIT = 10;

export const MSG_CONVERSATION_POST_REQUEST = 'MSG_CONVERSATION_POST_REQUEST';
export const MSG_CONVERSATION_POST_SUCCESS = 'MSG_CONVERSATION_POST_SUCCESS';
export const MSG_CONVERSATION_POST_FAILURE = 'MSG_CONVERSATION_POST_FAILURE';

export const MSG_CONVERSATION_MSGS_REQUEST = 'MSG_CONVERSATION_MSGS_REQUEST';
export const MSG_CONVERSATION_MSGS_SUCCESS = 'MSG_CONVERSATION_MSGS_SUCCESS';
export const MSG_CONVERSATION_MSGS_FAILURE = 'MSG_CONVERSATION_MSGS_FAILURE';

export const MSG_CONVERSATION_LEAVE_REQUEST = 'MSG_CONVERSATION_LEAVE_REQUEST';
export const MSG_CONVERSATION_LEAVE_SUCCESS = 'MSG_CONVERSATION_LEAVE_SUCCESS';
export const MSG_CONVERSATION_LEAVE_FAILURE = 'MSG_CONVERSATION_LEAVE_FAILURE';

export const MSG_CONVERSATION_DELETE_REQUEST =
  'MSG_CONVERSATION_DELETE_REQUEST';
export const MSG_CONVERSATION_DELETE_SUCCESS =
  'MSG_CONVERSATION_DELETE_SUCCESS';
export const MSG_CONVERSATION_DELETE_FAILURE =
  'MSG_CONVERSATION_DELETE_FAILURE';

export const MSG_CONVERSATION_DISTURB_REQUEST =
  'MSG_CONVERSATION_DISTURB_REQUEST';
export const MSG_CONVERSATION_DISTURB_SUCCESS =
  'MSG_CONVERSATION_DISTURB_SUCCESS';
export const MSG_CONVERSATION_DISTURB_FAILURE =
  'MSG_CONVERSATION_DISTURB_FAILURE';

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
    const toMessageId = 0; // TODO: detect first message id

    return dispatch(loadMessages(conversationId, {
      toMessageId,
      limit: ARCHIVED_MESSAGES_LIMIT,
    }));
  };
}

export function deleteMessages() {
  /*
  deleteMessages(conversationId, ids = [], all) {
    return $.ajax({
      url: ApiRoutes.messengerDeleteMessages(conversationId),
      method: 'DELETE',
      data: {
        socket_id: this.socket_id,
        ids: ids.join(','),
        all: all,
      },
    });
  }
  deleteMessages(conversationId, msgIds, all = false) {
    return this.requester.deleteMessages(conversationId, msgIds, all)
      .done((data) => data)
      .fail((err) => NoticeService.errorResponse(err));
  }
*/
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


/*
    decreaseUnreadCount(conversationId) {
      const conversation = this.findConversation(conversationId);

      if (!conversation) {
        return;
      }

      const { unread_messages_count: unreadCount } = conversation;

      if (unreadCount && unreadCount > 0) {
        conversation.unread_messages_count = unreadCount - 1;
      }
    },

    unreadCount(conversationId) {
      const conversation = this.findConversation(conversationId);

      return conversation && conversation.unread_messages_count;
    },

    unreadCountByUserId(userId) {
      const conversation = this.getConversationByUserId(userId);

      return conversation && conversation.unread_messages_count;
    },

    updateOnlineStatuses(convIds = [], data = []) {
      const statusMap = data.reduce((acc, item) => ({...acc, [item.user_id]: item }), {});

      convIds.forEach((conversationId) => {
        const conversation = this.findConversation(conversationId);
        if (conversation && conversation.type === PRIVATE_CONVERSATION) {
          conversation.recipient.is_online = statusMap[conversation.recipient_id]
            .is_online;
          conversation.recipient.last_seen_at = statusMap[conversation.recipient_id]
            .last_seen_at;
        }
      });
    },

  }
);
*/
