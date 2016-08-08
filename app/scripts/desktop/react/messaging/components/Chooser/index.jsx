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
    selected,
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
            selected={selected}
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
  selected: PropTypes.object,
  users: PropTypes.object.isRequired,
};

Chooser.defaultProps = {
  selectedIds: [],
};

export default Chooser;
