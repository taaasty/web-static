import React, { PropTypes } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import UserAvatar from '../../../../../components/avatars/UserAvatar';
import ConversationsListItemEntryContent from './ConversationsListItemEntryContent';
import ConversationsListItemEntryUsers from './ConversationsListItemEntryUsers';

class ConversationsListItemEntry {
  renderFooter() {
    const { created_at, last_message, users } = this.props.conversation;

    return (
      <div>
        <span className="messages__date">
          {moment(last_message ? last_message.created_at : created_at).format('D MMMM HH:mm')}
        </span>
        <ConversationsListItemEntryUsers users={users} />
      </div>
    );
  }
  renderNotificationButton() {
    const notifyButtonClasses = classNames({
      'messages__notification-button': true,
      '__active': this.props.conversation.notify,
    });
    return (
      <button className={notifyButtonClasses}>
        <i className="icon icon--bell" />
      </button>
    );
  }
  render() {
    const { conversation: { entry, online },
            hasUnread, onClick, showFooter } = this.props;

    const listItemClasses = classNames({
      'messages__dialog': true,
      'messages__dialog--discussion': true,
      'state--read': !hasUnread,
    });

    return (
      <div className={listItemClasses} onClick={onClick}>
        {false && this.renderNotificationButton()}
        <span className="messages__user-avatar">
          <UserAvatar size={35} user={entry.author} />
          {online && <span className="messages__user-online" />}
        </span>
        <div className="messages__dialog-content">
          <ConversationsListItemEntryContent entry={entry} />
        </div>
        {showFooter && this.renderFooter()}
      </div>
    );
  }
}

ConversationsListItemEntry.propTypes = {
  conversation: PropTypes.object.isRequired,
  hasUnread: PropTypes.bool,
  hasUnreceived: PropTypes.bool,
  onClick: PropTypes.func,
  showFooter: PropTypes.bool,
};

ConversationsListItemEntry.defaultProps = {
  showFooter: true,
};

export default ConversationsListItemEntry;
