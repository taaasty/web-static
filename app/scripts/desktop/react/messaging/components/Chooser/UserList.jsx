import React, { PropTypes } from 'react';
import UserListItem from './UserListItem';
import Spinner from '../../../../../shared/react/components/common/Spinner';
import Scroller from '../../../components/common/Scroller';

function UserList(props) {
  const {
    isFetching,
    onClick,
    selected,
    users,
  } = props;

  return isFetching
    ? <Spinner size={30} />
    : <Scroller>
        <div className="messages__dialogs">
          {users.map((user) => (
             <UserListItem
               isSelected={!!selected && selected.includes(user.get('id'))}
               key={user.get('id')}
               onClick={onClick.bind(null, user)}
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
  selected: PropTypes.object,
  users: PropTypes.object.isRequired,
};

export default UserList;
