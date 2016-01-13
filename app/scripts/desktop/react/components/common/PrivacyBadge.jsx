/*global i18n, $ */
import React from 'react';
import { findDOMNode } from 'react-dom';

class PrivacyBadge {
  componentDidMount() {
    $(findDOMNode(this)).tooltip({
      container: 'body',
      html: true,
      placement: 'bottom',
      title: i18n.t('entry.privacy_badge'),
    });
  }
  componentWillUnmount() {
    $(findDOMNode(this)).tooltip('destroy');
  }
  render() {
    return (
      <span className="privacy-badge">
        <i className="icon icon--locks" />
      </span>
    );
  }
}

PrivacyBadge.propTypes = {
};

export default PrivacyBadge;
