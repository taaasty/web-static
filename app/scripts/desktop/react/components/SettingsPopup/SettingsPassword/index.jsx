import React, { Component, PropTypes } from 'react';
import SettingsPasswordShow from './SettingsPasswordShow';
import SettingsPasswordEdit from './SettingsPasswordEdit';

const SHOW_STATE = 'show';
const EDIT_STATE = 'edit';

class SettingsPassword extends Component {
  state = { currentState: SHOW_STATE };
  activateShowState() {
    this.setState({ currentState: SHOW_STATE });
  }
  activateEditState() {
    this.setState({ currentState: EDIT_STATE });
  }
  handleSubmit(newPassword) {
    return this.props.onUpdate(newPassword)
      .then(this.activateShowState.bind(this));
  }
  render() {
    return this.state.currentState === SHOW_STATE
      ? <SettingsPasswordShow onEditStart={this.activateEditState.bind(this)} />
      : (
        <SettingsPasswordEdit
          onEditCancel={this.activateShowState.bind(this)}
          onSubmit={this.handleSubmit.bind(this)}
        />
      );
  }
}

SettingsPassword.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};

export default SettingsPassword;
