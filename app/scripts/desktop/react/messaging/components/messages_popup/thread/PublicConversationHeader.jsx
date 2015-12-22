import React, { PropTypes } from 'react';
import classNames from 'classnames';
import UserAvatar from '../../../../components/avatars/UserAvatar';
import PublicConversationHeaderContent from './PublicConversationHeaderContent';
import PublicConversationActions from './PublicConversationActions';

class PublicConversationHeader {
  render() {
    const { conversation, onClick } = this.props;

    const listItemClasses = classNames({
      'messages__dialog': true,
      'messages__dialog--discussion': true,
    });

    return (
      <div className={listItemClasses} onClick={onClick}>
        <span className="messages__user-avatar">
          <UserAvatar size={35} user={conversation.entry.author} />
          {conversation.online && <span className="messages__user-online" />}
        </span>
        <div className="messages__dialog-content">
          <PublicConversationHeaderContent entry={conversation.entry} />
        </div>
        <PublicConversationActions conversation={conversation} />
      </div>
    );
  }
}

PublicConversationHeader.propTypes = {
  conversation: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

PublicConversationHeader.defaultProps = {
  conversation: {
    last_message: {
      author: {
        userpic: {},
      },
    },
  },
};

export default PublicConversationHeader;
