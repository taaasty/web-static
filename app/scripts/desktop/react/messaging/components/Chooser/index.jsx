import React, { PropTypes } from 'react';
//import Button from './Button';
import Dropdown from './Dropdown';
import UserList from './UserList';
import classNames from 'classnames';

function Chooser(props) {
  const {
    isFetching,
    onClickUser,
    onSubmit,
    selectState,
    selectedIds,
    users,
  } = props;

  const friendsClasses = classNames({
    'messages__friends-container': true,
    'message--select-mode': selectState,
  });

  return (
    <div className="messages__chooser-container">
      <div className="messages__box">
        <div className="messages__chooser state--open">
          <Dropdown onSubmit={onSubmit} />
        </div>
      </div>
      <div className="messages__body">
        <div className={friendsClasses}>
          <UserList
            isFetching={isFetching}
            onClick={onClickUser}
            selectState={selectState}
            selectedIds={selectedIds}
            users={users}
          />
        </div>
      </div>
    </div>
  );
}

Chooser.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  onClickUser: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selectState: PropTypes.bool.isRequired,
  selectedIds: PropTypes.array,
  users: PropTypes.object.isRequired,
};

Chooser.defaultProps = {
  selectedIds: [],
};

export default Chooser;
