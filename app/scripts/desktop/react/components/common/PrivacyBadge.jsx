/*global i18n, $ */
import React, { Component } from 'react';

class PrivacyBadge extends Component {
  componentDidMount() {
    $(this.refs.container).tooltip({
      container: 'body',
      html: true,
      placement: 'bottom',
      title: i18n.t('entry.privacy_badge'),
    });
  }
  componentWillUnmount() {
    $(this.refs.container).tooltip('destroy');
  }
  render() {
    return (
      <span className="privacy-badge" ref="container">
        <i className="icon icon--locks" />
      </span>
    );
  }
}

PrivacyBadge.propTypes = {
};

export default PrivacyBadge;
