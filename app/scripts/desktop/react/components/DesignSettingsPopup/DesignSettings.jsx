/*global i18n */
import React, { Component, PropTypes } from 'react';
import Popup from '../Popup';
import classNames from 'classnames';
import DesignSettingsDropZone from './DesignSettingsDropZone';
import DesignSettingsGroups from './DesignSettingsGroups';
import DesignSettingsSaveButton from './DesignSettingsSaveButton';

class DesignSettings extends Component {
  state = {
    dragActive: false,
  };
  handleDragLeave(ev) {
    const rect = this.refs.container.getBoundingClientRect();

    if (ev.clientX > rect.left + rect.width || ev.clientX < rect.left ||
        ev.clientY > rect.top + rect.height || ev.clientY < rect.top) {
      this.setState({ dragActive: false });
    }
  }
  handleDragOver(ev) {
    ev.preventDefault();

    if (!this.state.dragActive) {
      ev.preventDefault();
      ev.dataTransfer.dropEffect = 'copy';

      this.setState({ dragActive: true });
    }
  }
  handleDrop(ev) {
    ev.preventDefault();
    const file = ev.dataTransfer.files[0];

    if (file) {
      this.props.onBgImageChange(file);
    }

    this.setState({ dragActive: false });
  }
  render() {
    const {
      availableOptions,
      changeDesignOption,
      design,
      hasChanges,
      hasPaidValues,
      isFetching,
      isPremium,
      onBgImageChange,
      onClose,
      onSave,
    } = this.props;
    const settingsClasses = classNames('design-settings', {
      '__has-unsaved-fields': hasChanges,
      '__draghover': this.state.dragActive,
    });

    return (
      <Popup
        className="popup--design-settings"
        clue="designSettings"
        draggable
        onClose={onClose}
        title={i18n.t('design_settings_header')}
      >
        <div
          className={settingsClasses}
          onDragLeave={this.handleDragLeave.bind(this)}
          onDragOver={this.handleDragOver.bind(this)}
          onDrop={this.handleDrop.bind(this)}
          ref="container"
        >
          <DesignSettingsDropZone />
          <div className="design-settings__options">
            <DesignSettingsGroups
              availableOptions={availableOptions}
              changeDesignOption={changeDesignOption}
              design={design}
              onBgImageChange={onBgImageChange}
            />
            {hasChanges &&
             <DesignSettingsSaveButton
               hasPaidValues={hasPaidValues}
               isFetching={isFetching}
               isPremium={isPremium}
               onClick={onSave}
             />
            }
          </div>
        </div>
      </Popup>
    );
  }
}

DesignSettings.propTypes = {
  availableOptions: PropTypes.object.isRequired,
  changeDesignOption: PropTypes.func.isRequired,
  design: PropTypes.object.isRequired,
  hasChanges: PropTypes.bool.isRequired,
  hasPaidValues: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isPremium: PropTypes.bool.isRequired,
  onBgImageChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default DesignSettings;
