import React, { PropTypes } from 'react';
import UserListItem from './UserListItem';
import Spinner from '../../../../../shared/react/components/common/Spinner';
import Scroller from '../../../components/common/Scroller';

function UserList({ isFetching, onClick, selectedIds, users })  {
  return isFetching
    ? <Spinner size={30} />
    : <Scroller>
        <div className="messages__dialogs">
          {users.map((user) => (
             <UserListItem
               key={user.get('id')}
               onClick={onClick.bind(null, user)}
               selected={selectedIds.indexOf(user.get('id')) > -1}
               user={user}
             />)).valueSeq()
          }
        </div>
      </Scroller>
}

UserList.displayName = 'UserList';

UserList.propTypes = {
  isFetching: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  selectedIds: PropTypes.array.isRequired,
  users: PropTypes.object.isRequired,
};

UserList.defaultProps = {
  onClick: () => {},
  selectedIds: [],
};

export default UserList;
