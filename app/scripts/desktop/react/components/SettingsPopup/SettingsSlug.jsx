/*global i18n */
import React, { Component, PropTypes } from 'react';
import NoticeService from '../../services/Notice';
import EditableField from '../common/EditableField';
import { NOTIFY_TIMEOUT } from './index';

class SettingsSlug extends Component {
  state = { slug: this.props.slug };
  resetSlug() {
    this.setState({ slug: this.props.slug });
  }
  handleSave(slug) {
    if (slug) {
      if (slug !== this.props.slug) {
        this.setState({ slug });
        this.props.handleChange(slug)
          .catch(this.resetSlug.bind(this));
      }
    } else {
      NoticeService.notifyError(i18n.t('settings_empty_slug_error'), NOTIFY_TIMEOUT);
    }
  }
  handleChange(slug) {
    this.setState({ slug });
  }
  render() {
    return (
      <div className="settings__hero__name">
        <EditableField
          maxLength={20}
          onBlur={this.resetSlug.bind(this)}
          onChange={this.handleChange.bind(this)}
          onSave={this.handleSave.bind(this)}
          placeholder={i18n.t('settings_slug_placeholder')}
          value={this.state.slug}
          withPencil
        />
      </div>
    );
  }
}

SettingsSlug.propTypes = {
  handleChange: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired,
};

export default SettingsSlug;
