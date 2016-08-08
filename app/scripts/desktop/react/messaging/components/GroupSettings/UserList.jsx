import React, { PropTypes } from 'react';
import UserListItem from './UserListItem';
import Scroller from '../../../components/common/Scroller';

function UserList(props) {
  const {
    admin,
    isAdmin,
    openConversation,
    unselectUser,
    users,
  } = props;

  return (
    <Scroller>
      <div className="messages__dialogs">
        {users.map((user) => (
           <UserListItem
             admin={admin}
             isAdmin={isAdmin}
             key={user.get('id')}
             openConversation={openConversation}
             unselectUser={unselectUser}
             user={user}
           />)).valueSeq()
        }
      </div>
    </Scroller>
  );
}

UserList.displayName = 'UserList';

UserList.propTypes = {
  admin: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  openConversation: PropTypes.func.isRequired,
  unselectUser: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
};

export default UserList;
