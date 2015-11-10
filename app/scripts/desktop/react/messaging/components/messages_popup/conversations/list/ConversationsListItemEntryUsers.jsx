/*global i18n */
import React, { PropTypes } from 'react';
import ConversationsListItemEntryUserAvatar from './ConversationsListItemEntryUserAvatar';

class ConversationsListItemEntryUsers {
  render() {
    const { users } = this.props;

    return (
      <div className="messages__dialor-users __short">
        <div className="messages__dialog-users-cell">
          {users.map((u, idx) => <ConversationsListItemEntryUserAvatar isExtra={idx > 3} user={u} />)}
        </div>
        <div className="messages__dialog-users-cell">
          <p dangerouslySetInnerHTML={{ __html: i18n.t('conversation_entry_users', { count: users.length }) }}/>
        </div>
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
