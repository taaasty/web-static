/*global i18n, EditableField */
import React, { Component, PropTypes } from 'react';
import NoticeService from '../../services/Notice';

export default class SettingsSlug extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    slug: PropTypes.string.isRequired,
  }
  state = {
    slug: this.props.slug,
  }
  handleEditEnd(slug) {
    if (slug) {
      if (slug !== this.state.slug) {
        this.setState({ slug });
        this.props.onChange(slug);
      }
    } else {
      NoticeService.notifyError(i18n.t('settings_empty_slug_error'), 2000);
      //TODO: removed this.forceUpdate(), check if was necessary
    }
  }

  render() {
    return (
      <div className="settings__hero__name">
        <EditableField
          defaultValue={this.state.slug}
          onEditEnd={this.handleEditEnd.bind(this)} />
          placeholder={i18n.t('settings_slug_placeholder')}
      </div>
    );
  }
}
