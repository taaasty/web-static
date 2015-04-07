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
      dragActive: false
    };
  },

  render() {
    let settingsClasses = classSet({
      'design-settings': true,
      '__draghover': this.state.dragActive
    });

    return (
      <div className={settingsClasses}
           onDragOver={this.handleDragOver}
           onDragLeave={this.handleDragLeave}
           onDrop={this.handleDrop}>
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

  handleDragLeave(e) {
    var rect = this.getDOMNode().getBoundingClientRect();

    if (e.clientX > rect.left + rect.width || e.clientX < rect.left ||
        e.clientY > rect.top + rect.height || e.clientY < rect.top) {
      this.setState({dragActive: false});
    }
  },

  handleDragOver(e) {
    e.preventDefault();

    if (!this.state.dragActive) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';

      this.setState({dragActive: true});
    }
  },

  handleDrop(e) {
    e.preventDefault();
    let file = e.dataTransfer.files[0];

    if (file) {
      this.props.onBgImageChange(file);
    }

    this.setState({dragActive: false});
  }
});

export default DesignSettings;