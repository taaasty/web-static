import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import DesignSettingsDropZone from './DropZone/DropZone';
import DesignSettingsGroups from './Groups/Groups';
import DesignSettingsSaveButton from './buttons/Save';

class DesignSettings extends Component {
  state = {
    dragActive: false,
  };
  handleDragLeave(e) {
    const rect = this.refs.container.getBoundingClientRect();

    if (e.clientX > rect.left + rect.width || e.clientX < rect.left ||
        e.clientY > rect.top + rect.height || e.clientY < rect.top) {
      this.setState({ dragActive: false });
    }
  }
  handleDragOver(e) {
    e.preventDefault();

    if (!this.state.dragActive) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';

      this.setState({ dragActive: true });
    }
  }
  handleDrop(e) {
    e.preventDefault();
    let file = e.dataTransfer.files[0];

    if (file) {
      this.props.onBgImageChange(file);
    }

    this.setState({ dragActive: false });
  }
  renderSaveButton() {
    const { hasDesignBundle, hasPaidValues, hasUnsavedFields, isSaving, onSave } = this.props;

    if (hasUnsavedFields) {
      return (
        <DesignSettingsSaveButton
          hasDesignBundle={hasDesignBundle}
          hasPaidValues={hasPaidValues}
          isSaving={isSaving}
          onClick={onSave}
        />
      );
    }
  }
  render() {
    const settingsClasses = classnames('design-settings', {
      '__has-unsaved-fields': this.props.hasUnsavedFields,
      '__draghover': this.state.dragActive,
    });

    return (
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
            design={this.props.design}
            onBgImageChange={this.props.onBgImageChange}
            onOptionChange={this.props.onOptionChange}
            options={this.props.options}
          />
          {this.renderSaveButton()}
        </div>
      </div>
    );
  }
}

DesignSettings.propTypes = {
  design: PropTypes.object.isRequired,
  hasDesignBundle: PropTypes.bool.isRequired,
  hasPaidValues: PropTypes.bool.isRequired,
  hasUnsavedFields: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  onBgImageChange: PropTypes.func.isRequired,
  onOptionChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired,
};

export default DesignSettings;
