/*global i18n */
import React, { PropTypes } from 'react';
import ErrorService from '../../../../../../shared/react/services/Error';
import classNames from 'classnames';
import { msgDate } from '../../../../helpers/dateHelpers';
import { List, Map } from 'immutable';

export function getLastTyping(typing=List(), users=List()) {
  return typing
    .sortBy((t) => t.get('eventAt'))
    .map((_, userId) => users
      .filter((u) => u.get('id') === parseInt(userId, 10))
      .first()
    )
    .last();
}

export function getLastMsgTxt(lastMsg=Map()) {
  const contentHtml = lastMsg.get('contentHtml');
  const attachments = lastMsg.get('attachments', List());

  if (contentHtml) {
    return contentHtml;
  } else if (attachments.count()) {
    return i18n.t('messenger.image');
  } else {
    ErrorService.notifyError(
      'last_message в списке чатов. Пустое поле content_html и пустой attathments',
      { id: lastMsg.get('id'), conversationId: lastMsg.get('conversationId') }
    );
    return i18n.t('messenger.image');
  }
}

function ItemMain(props) {
  const {
    children,
    createdAt,
    hasUnread,
    isMuted,
    lastMessage,
    onClick,
    unreadCount,
    userId,
  } = props;
  const lastMessageAt = lastMessage.get('createdAt') || createdAt;
  const listItemClasses = classNames({
    'messages__dialog': true,
    'state--read': !hasUnread,
    'muted': isMuted,
  });

  function renderLastMsgStatus() {
    if (lastMessage.getIn(['author', 'id']) === userId) {
      return (
        <span className="messages__tick-status">
          <i className={`icon icon--${lastMessage.get('readAt') ? 'double-tick' : 'tick'}`} />
        </span>
      );
    }

    return null;
  }

  return (
    <div className={listItemClasses} onClick={onClick}>
      {!!hasUnread && (
        <div className="unread-messages__counter">
          {unreadCount}
        </div>
      )}
      {children}
      {isMuted &&
        <span className="messages__muted">
          <i className="icon icon--mute-on" />
        </span>
      }
      <span className="messages__date">
        {renderLastMsgStatus()}
        {msgDate(lastMessageAt)}
      </span>
    </div>
  );
}

ItemMain.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
  createdAt: PropTypes.string.isRequired,
  hasUnread: PropTypes.bool.isRequired,
  hasUnreceived: PropTypes.bool.isRequired,
  isMuted: PropTypes.bool,
  lastMessage: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  unreadCount: PropTypes.number,
  userId: PropTypes.number.isRequired,
};

export default ItemMain;
