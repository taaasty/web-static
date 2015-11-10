import React, { PropTypes } from 'react';
import classNames from 'classnames';
import UserAvatar from '../../../../../components/avatars/UserAvatar';
import moment from 'moment';

class ConversationsListItemText {
  renderIndicator() {
    const { conversation: { unread_messages_count }, hasUnread, hasUnreceived } = this.props;

    if (hasUnread) {
      return <div className="unread-messages__counter">{unread_messages_count}</div>;
    } else if (hasUnreceived) {
      return <div className="unreceived-messages__counter" />;
    }
  }
  render() {
    const { conversation: { created_at, last_message, recipient, online }, hasUnread, onClick } = this.props;

    const listItemClasses = classNames({
      'messages__dialog': true,
      'state--read': !hasUnread,
    });
    const lastMessageText = last_message ? last_message.content_html : '';

    return (
      <div className={listItemClasses} onClick={onClick}>
        {this.renderIndicator()}
        <span className="messages__user-avatar">
          <UserAvatar user={recipient} size={35} />
          {online && <span className="messages__user-online" />}
        </span>
        <div className="messages__dialog-text">
          <span className="messages__user-name">
            {recipient.slug}
          </span>
          {lastMessageText && <span dangerouslySetInnerHTML={{ __html: lastMessageText }} />}
        </div>
        <span className="messages__date">
          {moment(last_message ? last_message.created_at : created_at).format('D MMMM HH:mm')}
        </span>
      </div>
    );
  }
}

ConversationsListItemText.propTypes = {
  conversation: PropTypes.object.isRequired,
  hasUnread: PropTypes.bool,
  hasUnreceived: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ConversationsListItemText;
