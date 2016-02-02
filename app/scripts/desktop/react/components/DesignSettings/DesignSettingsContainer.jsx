import React, { Component, PropTypes } from 'react';
import DesignActionCreators from '../../actions/design';
import PopupActionCreators from '../../actions/popup';
import CurrentUserStore from '../../stores/current_user';
import DesignStore from '../../stores/design';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import DesignSettings from './DesignSettings';

class DesignSettingsContainer extends Component {
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
      <DesignSettings {...this.props}
        onBgImageChange={this.changeBgImage}
        onOptionChange={this.changeOption}
        onSave={this.save.bind(this)}
      />
    );
  }
}

DesignSettingsContainer = connectToStores(DesignSettingsContainer, [DesignStore, CurrentUserStore], (props) => ({
  design: DesignStore.getCurrent(),
  options: DesignStore.getOptions(),
  hasDesignBundle: CurrentUserStore.hasDesignBundle(),
  hasUnsavedFields: DesignStore.hasUnsavedFields(),
  hasPaidValues: DesignStore.hasPaidValues(),
  isSaving: DesignStore.isSaving(),
}));

DesignSettingsContainer.propTypes = {
  design: PropTypes.object.isRequired,
  hasDesignBundle: PropTypes.bool.isRequired,
  hasPaidValues: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  options: PropTypes.object.isRequired,
};


export default DesignSettingsContainer;
