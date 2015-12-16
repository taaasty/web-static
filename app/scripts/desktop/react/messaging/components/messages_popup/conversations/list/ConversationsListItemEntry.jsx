import React, { PropTypes } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import UserAvatar from '../../../../../components/avatars/UserAvatar';
import ConversationsListItemEntryContent from './ConversationsListItemEntryContent';

class ConversationsListItemEntry {
  renderFooter() {
    const { author, content_html, created_at } = this.props.conversation.last_message;

    return (content_html &&
      <div className="discussion-last-message">
        <div className="messages__dialog">
          <span className="messages__user-avatar">
            <UserAvatar size={35} user={author} />
          </span>
          <div className="messages__dialog-text">
            <span className="messages__user-name">
              {author.slug}
            </span>
            <span dangerouslySetInnerHTML={{ __html: content_html}} />
          </div>
          <span className="messages__date">
            {moment(created_at).format('D MMMM HH:mm')}
          </span>
        </div>
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
    const { children, conversation, hasUnread, isInList, onClick } = this.props;

    const listItemClasses = classNames({
      'messages__dialog': true,
      'messages__dialog--discussion': true,
      'state--read': !hasUnread,
    });

    return (
      <div className={listItemClasses} onClick={onClick}>
        {false && this.renderNotificationButton()}
        <span className="messages__user-avatar">
          <UserAvatar size={35} user={conversation.entry.author} />
          {conversation.online && <span className="messages__user-online" />}
        </span>
        <div className="messages__dialog-content">
          <ConversationsListItemEntryContent entry={conversation.entry} />
        </div>
        {isInList && this.renderFooter()}
        {children}
      </div>
    );
  }
}

ConversationsListItemEntry.propTypes = {
  conversation: PropTypes.object.isRequired,
  hasUnread: PropTypes.bool,
  hasUnreceived: PropTypes.bool,
  isInList: PropTypes.bool,
  onClick: PropTypes.func,
};

ConversationsListItemEntry.defaultProps = {
  isInList: true,
  conversation: {
    last_message: {
      author: {
        userpic: {},
      },
    },
  },
};

export default ConversationsListItemEntry;
