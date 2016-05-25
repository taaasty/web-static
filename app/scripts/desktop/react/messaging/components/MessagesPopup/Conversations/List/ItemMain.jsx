/*global i18n */
import React, { Component, PropTypes } from 'react';
import ErrorService from '../../../../../../../shared/react/services/Error';
import classNames from 'classnames';
import { msgDate } from '../../../../../helpers/dateHelpers';

export function getLastTyping(typing, users) {
  const [ lastTyping ] = Object.keys(typing)
          .map((userId) => ({ userId, ...typing[userId] }))
          .sort((a, b) => (b.eventAt - a.eventAt))
          .map(({ userId }) => {
            const [ user ] = users.filter((u) => u.id === parseInt(userId, 10));

            return user;
          });

  return lastTyping;
};

export function getLastMsgTxt(lastMsg={}) {
  return lastMsg.content_html
    ? lastMsg.content_html
    : lastMsg.attachments && lastMsg.attachments.length
      ? i18n.t('messenger.image')
      : (ErrorService.notifyError(
        'last_message в списке чатов. Пустое поле content_html и пустой attathments',
        {
          id: lastMsg.id,
          conversationId: lastMsg.conversation_id,
        }), i18n.t('messenger.image'));
};

class ItemMain extends Component {
  renderLastMsgStatus() {
    const { lastMessage, userId } = this.props;
    // TODO: detect our msg
    if (lastMessage && lastMessage.author && lastMessage.author.id === userId) {
      return (
        <span className="messages__tick-status">
          <i className={`icon icon--${lastMessage.read_at ? 'double-tick' : 'tick'}`} />
        </span>
      );
    }

    return null;
  }
  render() {
    const { children, createdAt, hasUnread, isMuted, lastMessage,
            onClick, unreadCount } = this.props;
    const lastMessageAt = lastMessage ? lastMessage.created_at : createdAt;

    const listItemClasses = classNames({
      'messages__dialog': true,
      'state--read': !hasUnread,
      'muted': isMuted,
    });

    return (
      <div className={listItemClasses} onClick={onClick}>
        {!!hasUnread && <div className="unread-messages__counter">{unreadCount}</div>}
        {children}
        {isMuted &&
         <span className="messages__muted">
           <i className="icon icon--mute-on" />
         </span>
        }
        <span className="messages__date">
          {this.renderLastMsgStatus()}
          {msgDate(lastMessageAt)}
        </span>
      </div>
    );
  }
}

ItemMain.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
  createdAt: PropTypes.string.isRequired,
  hasUnread: PropTypes.bool,
  hasUnreceived: PropTypes.bool,
  isMuted: PropTypes.bool,
  lastMessage: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  unreadCount: PropTypes.number,
  userId: PropTypes.number.isRequired,
};

export default ItemMain;
