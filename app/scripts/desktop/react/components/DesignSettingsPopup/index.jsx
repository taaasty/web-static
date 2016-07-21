/*global i18n */
import React, { Component, PropTypes } from 'react';
import Popup from '../Popup';
import DesignActionCreators from '../../actions/design';
import PopupActionCreators from '../../actions/PopupActions';
import CurrentUserStore from '../../stores/current_user';
import DesignStore from '../../stores/design';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import DesignSettings from './DesignSettings';

class DesignSettingsPopup extends Component {
  componentWillUnmount() {
    DesignActionCreators.closeDesignSettings();
  }
  changeOption(name, value) {
    DesignActionCreators.changeOption(name, value);
  }
  changeBgImage(file) {
    DesignActionCreators.changeBgImage(file);
  }
  save() {
    if (this.props.hasPaidValues && !this.props.hasDesignBundle) {
      PopupActionCreators.showDesignSettingsPayment();
    } else {
      DesignActionCreators.saveCurrent();
    }
  }
  render() {
    return (
      <Popup
        className="popup--design-settings"
        clue="designSettings"
        draggable
        onClose={this.props.onClose}
        title={i18n.t('design_settings_header')}
      >
        <DesignSettings
          {...this.props}
          onBgImageChange={this.changeBgImage}
          onOptionChange={this.changeOption}
          onSave={this.save.bind(this)}
        />
      </Popup>
    );
  }
}

DesignSettingsPopup.propTypes = {
  design: PropTypes.object.isRequired,
  hasDesignBundle: PropTypes.bool.isRequired,
  hasPaidValues: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired,
};

DesignSettingsPopup = connectToStores(DesignSettingsPopup, [DesignStore, CurrentUserStore], ({ onClose }) => ({
  onClose,
  design: DesignStore.getCurrent(),
  options: DesignStore.getOptions(),
  hasDesignBundle: CurrentUserStore.hasDesignBundle(),
  hasUnsavedFields: DesignStore.hasUnsavedFields(),
  hasPaidValues: DesignStore.hasPaidValues(),
  isSaving: DesignStore.isSaving(),
}));

export default DesignSettingsPopup;
