import classSet from 'react/lib/cx';
import DesignSettingsDropZone from './DropZone/DropZone';
import DesignSettingsGroups from './Groups/Groups';
import DesignSettingsSaveButton from './buttons/Save';

let DesignSettings = React.createClass({
  propTypes: {
    design: React.PropTypes.object.isRequired,
    options: React.PropTypes.object.isRequired,
    hasDesignBundle: React.PropTypes.bool.isRequired,
    hasPaidValues: React.PropTypes.bool.isRequired,
    onOptionChange: React.PropTypes.func.isRequired,
    onBgImageChange: React.PropTypes.func.isRequired,
    onSave: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      dragging: false
    };
  },

  render() {
    let settingsClasses = classSet({
      'design-settings': true,
      '__draghover': this.state.dragging
    });

    return (
      <div className={settingsClasses}>
        <DesignSettingsDropZone />
        <div className="design-settings__options">
          <DesignSettingsGroups
              design={this.props.design}
              options={this.props.options}
              onOptionChange={this.props.onOptionChange}
              onBgImageChange={this.props.onBgImageChange} />
          <DesignSettingsSaveButton
              hasPaidValues={this.props.hasPaidValues}
              hasDesignBundle={this.props.hasDesignBundle}
              onClick={this.props.onSave} />
        </div>
      </div>
    );
  },
});

export default DesignSettings;