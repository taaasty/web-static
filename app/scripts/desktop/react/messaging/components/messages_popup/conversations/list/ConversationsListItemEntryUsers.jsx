/*global i18n */
import React, { PropTypes } from 'react';
import ConversationsListItemEntryUserAvatar from './ConversationsListItemEntryUserAvatar';

const MAX_USERS = 4;

class ConversationsListItemEntryUsers {
  render() {
    const { users } = this.props;

    return (
      <div className="messages__dialog-users __short">
        <div className="messages__dialog-users-cell">
          {users.map((u, idx) => <ConversationsListItemEntryUserAvatar isExtra={idx >= MAX_USERS } user={u} />)}
        </div>
        {users.length > MAX_USERS &&
          <div className="messages__dialog-users-cell">
            <p dangerouslySetInnerHTML={{ __html: i18n.t('conversation_entry_users', { count: users.length - 1 }) }}/>
           </div>
        }
      </div>
    );
  }
}

ConversationsListItemEntryUsers.propTypes = {
  users: PropTypes.array.isRequired,
};

ConversationsListItemEntryUsers.defaultProps = {
  users: [],
};

export default ConversationsListItemEntryUsers;
