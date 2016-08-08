/*global i18n */
import React, { PropTypes } from 'react';
import UserAvatar from '../../../components/UserAvatar';
import UserSlug from '../../../components/UserSlug';
import UserActions from './UserActions';
import { CONVERSATION_PIC_SIZE } from '../Conversations/List/Item';

function UserListItem(props) {
  const {
    admin,
    isAdmin,
    openConversation,
    unselectUser,
    user,
  } = props;
  const adminId = admin.get('id');

  return (
    <div className="message--container">
      <div className="messages__dialog --with-actions">
        <span className="messages__user-avatar">
          <UserAvatar size={CONVERSATION_PIC_SIZE} user={user.toJS()} />
        </span>
        <div className="messages__dialog-text">
          <div className="messages__user-name">
            <UserSlug user={user} />
            {adminId && adminId === user.get('id') &&
             <span className="messages__dialog-admin">
               {i18n.t('messenger.group.admin')}
             </span>
            }
          </div>
        </div>
        <UserActions
          admin={admin}
          isAdmin={isAdmin}
          openConversation={openConversation}
          unselectUser={unselectUser}
          user={user}
        />
      </div>
    </div>
  );
}

UserListItem.displayName = 'UserListItem';

UserListItem.propTypes = {
  admin: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  openConversation: PropTypes.func.isRequired,
  unselectUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default UserListItem;
