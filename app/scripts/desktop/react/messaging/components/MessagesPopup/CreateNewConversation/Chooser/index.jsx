 /*global $, NoticeService */
import React, { Component, PropTypes } from 'react';
import Button from './Button';
import Dropdown from './Dropdown';
import UserList from './UserList';
import NewGroupChatButton from './NewGroupChatButton';
import classNames from 'classnames';
import ApiRoutes from '../../../../../../../shared/routes/api';

const OPEN_STATE  = 'openState';
const CLOSE_STATE = 'closeState';

class Chooser extends Component {
  state = {
    currentState: OPEN_STATE,
    loading: false,
    selectState: false,
    selectedIds: [], //FIXME refactor to redux store
    users: [],
  };
  componentWillMount() {
    this.mounted = true;
    this.setState({ loading: true });
    $.ajax({ url: ApiRoutes.relationships_by_url('friend') })
      .done(({ relationships }) => {
        if (this.mounted) {
          this.setState({ users: relationships.map((r) => r.reader) });
        }
      })
      .fail((error) => NoticeService.errorResponse(error))
      .then(() => this.setState({ loading: false }));
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  activateOpenState() {
    this.setState({ currentState: OPEN_STATE });
  }
  activateCloseState() {
    this.setState({ currentState: CLOSE_STATE });
  }
  handleSubmit(id) {
    const { selectState, selectedIds } = this.state;

    if (selectState) {
      if (selectedIds.indexOf(id) > -1) {
        this.setState({ selectedIds: selectedIds.filter((i) => i !== id )});
      } else {
        this.setState({ selectedIds: [ ...selectedIds, id ]});
      }
    } else {
      this.props.onSubmit(id);
    }
  }
  handleNewGroupChatButton() {
    const { selectState } = this.state;

    if (selectState) {
      console.log('create chat');
      this.setState({ selectState: false });
    } else {
      this.setState({ selectState: true });
    }
  }
  render() {
    const { currentState, loading, selectState, selectedIds, users } = this.state;
    const chooserClasses = classNames({
      'messages__chooser': true,
      'state--open': currentState === OPEN_STATE,
    });
    const friendsClasses = classNames({
      'messages__friends-container': true,
      '--select-state': selectState,
    });

    return (
      <div className="messages__body">
        <div className="messages__box">
          <div className={chooserClasses}>
            {currentState === CLOSE_STATE
             ? <Button onClick={this.activateOpenState.bind(this)} />
             : <Dropdown
                 onCancel={this.activateCloseState.bind(this)}
                 onSubmit={this.handleSubmit.bind(this)}
               />
            }
          </div>
        </div>
        <div className={friendsClasses}>
          <UserList
            loading={loading}
            onClick={this.handleSubmit.bind(this)}
            selectState={selectState}
            selectedIds={selectedIds}
            users={users}
          />
        </div>
        <footer className="messages__footer">
          <NewGroupChatButton
            onClick={this.handleNewGroupChatButton.bind(this)}
            selectState={selectState}
          />
        </footer>
      </div>
    );
  }
}

Chooser.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Chooser;
