import React, { Component, PropTypes } from 'react';
import SettingsEmailEstablishShow from './SettingsEmailEstablishShow';
import SettingsEmailEstablishEdit from './SettingsEmailEstablishEdit';

const SHOW_STATE = 'show';
const EDIT_STATE = 'edit';

class SettingsEmailEstablish extends Component {
  state = { currentState: SHOW_STATE };
  activateShowState() {
    this.setState({ currentState: SHOW_STATE });
  }
  activateEditState() {
    this.setState({ currentState: EDIT_STATE });
  }
  render() {
    return this.state.currentState === SHOW_STATE
      ? <SettingsEmailEstablishShow onEditStart={this.activateEditState.bind(this)} />        
      : (
        <SettingsEmailEstablishEdit
          onEditCancel={this.activateShowState.bind(this)}
          onSubmit={this.props.onSubmit}
        />
      );
  }
}

SettingsEmailEstablish.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SettingsEmailEstablish;
