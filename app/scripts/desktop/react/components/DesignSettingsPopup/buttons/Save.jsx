/*global i18n */
import React, { Component, PropTypes } from 'react';
import Spinner from '../../../../../shared/react/components/common/Spinner';

class DesignSettingsSaveButton extends Component {
  getTitle() {
    return (this.props.hasDesignBundle || !this.props.hasPaidValues)
      ? i18n.t('design_settings_save_button')
      : i18n.t('design_settings_save_with_payment_button');
  }
  handleClick() {
    this.props.onClick();
  }
  render() {
    return (
      <button className="design-settings__save-button" onClick={this.handleClick.bind(this)}>
        {
          this.props.isSaving
            ? <Spinner size={14} />
            : this.getTitle()
        }
      </button>
    );
  }
}

DesignSettingsSaveButton.propTypes = {
  hasDesignBundle: PropTypes.bool.isRequired,
  hasPaidValues: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

export default DesignSettingsSaveButton;
