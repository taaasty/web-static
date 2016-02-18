import React, { PropTypes } from 'react';
import UserListItem from './UserListItem';
import Scroller from '../../../../components/common/Scroller';

function UserList({ adminId, isAdmin, users })  {
  return (
    <Scroller>
      <div className="messages__dialogs">
        {users.map((user) => (
           <UserListItem
             adminId={adminId}
             isAdmin={isAdmin}
             key={user.id}
             user={user}
           />))
        }
      </div>
    </Scroller>
  );
}

UserList.displayName = 'UserList';

UserList.propTypes = {
  adminId: PropTypes.number,
  isAdmin: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
};

UserList.defaultProps = {
  users: [],
};

export default UserList;
