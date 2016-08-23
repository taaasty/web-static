/*global i18n */
import React, { Component } from 'react';

class UnreadDivider extends Component {
  render() {
    return (
      <div className="message--container">
        <div className="message message--unread-divider">
          <div className="message--unread-divider-text">
            {i18n.t('messenger.unread_messages')}
          </div>
        </div>
      </div>
    );
  }
}

export default UnreadDivider;
