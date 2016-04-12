import React, { PropTypes } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import UserAvatar from '../../common/avatar/user';

function ConversationListItem({ item, onClick }) {
  function hasUnreadMessages() {
    return item.unread_messages_count > 0;
  }

  function hasUnreceivedMessages() {
   return item.unreceived_messages_count > 0;
  }

  function lastMessageCreatedAt() {
    return moment(item.last_message.created_at).format('D MMMM HH:mm');
  }

  function lastConversationCreatedAt() {
    return moment(item.created_at).format('D MMMM HH:mm');
  }

  function handleClick() {
    onClick(item.id);
  }

  function renderLastMessage() {
    const text = item.last_message ? item.last_message.content_html : '';
    const showAvatar = item.last_message &&
                       item.last_message.author &&
                       item.last_message.author.id === item.user_id;

    return (
      <span>
        {showAvatar &&
         <span className="messages__last-msg-avatar">
           <UserAvatar size={20} user={item.last_message.author} />
         </span>
        }
        <span dangerouslySetInnerHTML={{ __html: text }} />
      </span>
    );
  }

  function renderDate() {
    return (
      <span className="messages__date">
        {item.last_message ? lastMessageCreatedAt() : lastConversationCreatedAt()}
      </span>
    );
  }

  function renderCounter() {
    return hasUnreadMessages()
      ? (
        <div className="unread-messages__counter">
          {item.unread_messages_count}
        </div>
      )
      : hasUnreceivedMessages()
        ? <div className="unreceived-messages__counter" />
        : null;
  }

  const itemClasses = classNames({
    'messages__dialog': true,
    '__read': !hasUnreadMessages(),
  });

  return (
    <div className={itemClasses} onClick={handleClick}>
      <div className="messages__user-avatar">
        <UserAvatar size={42} user={item.recipient} />
      </div>
      <div className="messages__dialog-text">
        <span className="messages__user-name">
          {item.recipient.slug} 
        </span>
        {renderLastMessage()}
      </div>
      {renderCounter()}
      {renderDate()}
    </div>
  );
}

ConversationListItem.displayName = 'ConversationListItem';

ConversationListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ConversationListItem;
