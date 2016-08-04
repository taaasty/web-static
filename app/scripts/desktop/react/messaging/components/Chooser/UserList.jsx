import React, { PropTypes } from 'react';
import UserListItem from './UserListItem';
import Spinner from '../../../../../shared/react/components/common/Spinner';
import Scroller from '../../../components/common/Scroller';

function UserList({ loading, onClick, selectedIds, users })  {
  return loading
    ? <Spinner size={30} />
    : <Scroller>
        <div className="messages__dialogs">
          {users.map((user) => (
             <UserListItem
               key={user.id}
               onClick={onClick.bind(null, user)}
               selected={selectedIds.indexOf(user.id) > -1}
               user={user}
             />))
          }
        </div>
      </Scroller>
}

UserList.displayName = 'UserList';

UserList.propTypes = {
  loading: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  selectedIds: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
};

UserList.defaultProps = {
  onClick: () => {},
  selectedIds: [],
  users: [],
};

export default UserList;
