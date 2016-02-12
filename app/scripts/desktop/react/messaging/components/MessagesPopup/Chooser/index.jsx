import React, { Component, PropTypes } from 'react';
import Button from './Button';
import Dropdown from './Dropdown';
import UserList from './UserList';
import classNames from 'classnames';

const OPEN_STATE  = 'openState';
const CLOSE_STATE = 'closeState';

class Chooser extends Component {
  state = { currentState: OPEN_STATE };
  activateOpenState() {
    this.setState({ currentState: OPEN_STATE });
  }
  activateCloseState() {
    this.setState({ currentState: CLOSE_STATE });
  }
  render() {
    const { currentState } = this.state;
    const { loading, onClickUser, onSubmit, selectState,
            selectedIds, users } = this.props;
    const chooserClasses = classNames({
      'messages__chooser': true,
      'state--open': currentState === OPEN_STATE,
    });
    const friendsClasses = classNames({
      'messages__friends-container': true,
      'message--select-mode': selectState,
    });

    return (
      <div className="messages__body">
        <div className="messages__box">
          <div className={chooserClasses}>
            {currentState === CLOSE_STATE
             ? <Button onClick={this.activateOpenState.bind(this)} />
             : <Dropdown
                 onCancel={this.activateCloseState.bind(this)}
                 onSubmit={onSubmit}
               />
            }
          </div>
        </div>
        <div className={friendsClasses}>
          <UserList
            loading={loading}
            onClick={onClickUser}
            selectState={selectState}
            selectedIds={selectedIds}
            users={users}
          />
        </div>
      </div>
    );
  }
}

Chooser.propTypes = {
  loading: PropTypes.bool,
  onClickUser: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selectState: PropTypes.bool.isRequired,
  selectedIds: PropTypes.array,
  users: PropTypes.array.isRequired,
};

Chooser.defaultProps = {
  selectedIds: [],
  users: [],
};

export default Chooser;
