import React, { Component, PropTypes } from 'react';
import SettingsEmailShow from './SettingsEmailShow';
import SettingsEmailEdit from './SettingsEmailEdit';
import SettingsEmailEstablish from './SettingsEmailEstablish';

export const SHOW_STATE = 'show';
export const EDIT_STATE = 'edit';
export const ESTABLISH_STATE = 'establish';

class SettingsEmail extends Component {
  state = this.getCurrentStateFromProps(this.props, SHOW_STATE);
  componentWillReceiveProps(nextProps) {
    this.setState(this.getCurrentStateFromProps(nextProps, this.state.currentState));
  }
  getCurrentStateFromProps(props, state) {
    return {
      currentState: (props.email || props.confirmationEmail) ? state : ESTABLISH_STATE,
    };
  }
  activateEditState() {
    this.setState({ currentState: EDIT_STATE });
  }
  activateShowState() {
    this.setState({ currentState: SHOW_STATE });
  }
  handleSubmit(newEmail) {
    this.props.onUpdate(newEmail)
      .then(this.activateShowState.bind(this));
  }
  handleCancel() {
    this.props.onCancel()
      .then(this.activateShowState.bind(this));
  }
  render() {
    const { currentState } = this.state;
    const { confirmationEmail, email, error, isFetching, isSent, onResend } = this.props;

    if (currentState === SHOW_STATE) {
      return (
        <SettingsEmailShow
          confirmationEmail={confirmationEmail}
          email={email}
          error={error}
          isFetching={isFetching}
          isSent={isSent}
          onCancel={this.handleCancel.bind(this)}
          onEditStart={this.activateEditState.bind(this)}
          onResend={onResend}
        />
      );
    } else if (currentState === ESTABLISH_STATE) {
      return <SettingsEmailEstablish onSubmit={this.handleSubmit.bind(this)} />;
    } else if (currentState === EDIT_STATE) {
      return (
        <SettingsEmailEdit
          email={email}
          onEditCancel={this.activateShowState.bind(this)}
          onSubmit={this.handleSubmit.bind(this)}
        />
      );
    } else {
      return <noscript />;
    }
  }
}

SettingsEmail.propTypes = {
  confirmationEmail: PropTypes.any,
  email: PropTypes.any,
  error: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  isSent: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onResend: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default SettingsEmail;
