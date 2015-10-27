import React, { Component, PropTypes } from 'react';
import SettingsPhoneEdit from './SettingsPhoneEdit';
import SettingsPhoneShow from './SettingsPhoneShow';

const SHOW_STATE = 'show';
const EDIT_STATE = 'edit';

class SettingsPhone extends Component {
  state = {
    state: SHOW_STATE,
  }
  onEditCancel() {
    this.setState({ state: SHOW_STATE });
  }
  onEditStart() {
    this.setState({ state: EDIT_STATE });
  }
  onUpdate(phone) {
    this.props.onUpdate({
      phone,
      success: this.onEditCancel.bind(this),
    });
  }
  render() {
    const { phone } = this.props;

    return (
      this.state.state === EDIT_STATE
        ? <SettingsPhoneEdit
            onEditCancel={this.onEditCancel.bind(this)}
            onUpdate={this.onUpdate.bind(this)}
            phone={phone}
          />
        : <SettingsPhoneShow onEditStart={this.onEditStart.bind(this)} phone={phone} />
    );
  }
}

SettingsPhone.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  phone: PropTypes.string,
};

export default SettingsPhone;
