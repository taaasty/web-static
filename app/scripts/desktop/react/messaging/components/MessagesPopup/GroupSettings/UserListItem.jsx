/*global i18n */
import React, { PropTypes } from 'react';
import UserAvatar from '../../../../components/UserAvatar';
import UserSlug from '../../../../components/UserSlug';
import UserActions from './UserActions';
import { CONVERSATION_PIC_SIZE } from '../Conversations/List/Item';

function UserListItem({ adminId, isAdmin, user }) {
  return (
    <div className="message--container">
      <div className="messages__dialog --with-actions">
        <span className="messages__user-avatar">
          <UserAvatar size={CONVERSATION_PIC_SIZE} user={user} />
        </span>
        <div className="messages__dialog-text">
          <div className="messages__user-name">
            <UserSlug user={user} />
            {adminId && adminId === user.id &&
             <span className="messages__dialog-admin">
               {i18n.t('messenger.group.admin')}
             </span>
            }
          </div>
        </div>
        {adminId &&
         <UserActions
           adminId={adminId}
           isAdmin={isAdmin}
           user={user}
         />}
      </div>
    </div>
  );
}

UserListItem.displayName = 'UserListItem';

UserListItem.propTypes = {
  adminId: PropTypes.number,
  isAdmin: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

export default UserListItem;
