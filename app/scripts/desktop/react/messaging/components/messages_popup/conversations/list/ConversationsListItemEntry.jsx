import React, { PropTypes } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import UserAvatar from '../../../../../components/avatars/UserAvatar';
import ConversationsListItemEntryContent from './ConversationsListItemEntryContent';
import ConversationsListItemEntryUsers from './ConversationsListItemEntryUsers';

class ConversationsListItemEntry {
  render() {
    const { conversation: { created_at, entry, last_message, recipient, notify, online, users },
            hasUnread, onClick, showUsers } = this.props;

    const listItemClasses = classNames({
      'messages__dialog': true,
      'messages__dialog--discussion': true,
      'state--read': !hasUnread,
    });
    const notifyButtonClasses = classNames({
      'messages__notification-button': true,
      '__active': notify,
    });

    return (
      <div className={listItemClasses} onClick={onClick}>
        {false &&
          <button class={notifyButtonClasses}>
            <i class="icon icon--bell" />
           </button>
        }
        <span className="messages__user-avatar">
          <UserAvatar user={recipient} size={ 35 } />
          {online && <span className="messages__user-online" />}
        </span>
        <div className="messages__dialog-content">
          <ConversationsListItemEntryContent entry={entry} />
        </div>
        <span className="messages__date">
          {moment(last_message ? last_message.created_at : created_at).format('D MMMM HH:mm')}
        </span>
        {showUsers && <ConversationsListItemEntryUsers users={users} />}
      </div>
    );
  }
}

ConversationsListItemEntry.propTypes = {
  conversation: PropTypes.object.isRequired,
  hasUnread: PropTypes.bool,
  hasUnreceived: PropTypes.bool,
  onClick: PropTypes.func,
  showUsers: PropTypes.bool,
};

ConversationsListItemEntry.defaultProps = {
  showUsers: true,
};

export default ConversationsListItemEntry;
