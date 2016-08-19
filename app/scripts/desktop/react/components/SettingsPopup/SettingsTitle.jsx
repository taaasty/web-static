/*global i18n */
import React, { Component, PropTypes } from 'react';
import EditableField from '../common/EditableField';

class SettingsTitle extends Component {
  state = { title: this.props.title };
  resetTitle() {
    this.setState({ title: this.props.title });
  }
  handleSave(title) {
    if (title !== this.props.title) {
      this.setState({ title });
      this.props.handleChange(title)
        .catch(this.resetTitle.bind(this));
    }
  }
  handleChange(title) {
    this.setState({ title });
  }
  render() {
    return (
      <div className="settings__hero__text">
        <EditableField
          onBlur={this.resetTitle.bind(this)}
          onChange={this.handleChange.bind(this)}
          onSave={this.handleSave.bind(this)}
          placeholder={i18n.t('settings_description_placeholder')}
          saveOnEnter
          value={this.state.title}
          withPencil
        />
      </div>
    );
  }
}

SettingsTitle.propTypes = {
  handleChange: PropTypes.func.isRequired,
  title: PropTypes.string,
};

SettingsTitle.defaultProps = {
  title: '',
};
  
export default SettingsTitle;
