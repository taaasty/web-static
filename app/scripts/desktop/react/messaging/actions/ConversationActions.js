import { CALL_API, Schemas } from '../../middleware/api';
import ApiRoutes from '../../../../shared/routes/api';
import {
  defaultOpts,
  postOpts,
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

export function loadMessages(conversationId, data) {
  return {
    [CALL_API]: {
      endpoint: makeGetUrl(
        ApiRoutes.messenger_load_messages_url(conversationId),
        data
      ),
      schema: Schemas.MESSAGES_COLL,
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
    const toMessageId = 0;

    return dispatch(loadMessages(conversationId, {
      toMessageId,
      limit: ARCHIVED_MESSAGES_LIMIT,
    }));
  };
}

export function deleteMessages() {
  /*
  deleteMessages(conversationId, msgIds, all = false) {
    return this.requester.deleteMessages(conversationId, msgIds, all)
      .done((data) => data)
      .fail((err) => NoticeService.errorResponse(err));
  }
*/
}

export function leaveConversation(conversationId) {
  /*
  leaveConversation(conversationId) {
    return this.requester.leaveConversation(conversationId)
      .done((data) => {
        NoticeService.notifySuccess(i18n.t(
          'messenger.request.conversation_leave_success'));
        return data;
      })
      .fail((err) => NoticeService.errorResponse(err));
  }
  */
}

export function deleteConversation(conversationId) {
  /*
  deleteConversation(conversationId) {
    return this.requester.deleteConversation(conversationId)
      .done((data) => {
        MessagingDispatcher.handleServerAction({
          type: 'deleteConversation',
          id: conversationId,
        });
        NoticeService.notifySuccess(i18n.t(
          'messenger.request.conversation_delete_success'));
        return data;
      })
      .fail((err) => NoticeService.errorResponse(err));
  }
  */
}

export function dontDisturb(conversationId, flag) {
  /*
  dontDisturb(id, flag) {
      return this.requester.dontDisturb(id, flag)
        .done((data) => {
          MessagingDispatcher.handleServerAction({
            type: 'updateConversation',
            conversation: data,
          });

          return data;
        })
        .fail((err) => NoticeService.errorResponse(err));
    }
  */
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
