/*global i18n */
import React, { PropTypes } from 'react';

const propTypes = {
  count: PropTypes.number.isRequired,
  href: PropTypes.string.isRequired,
};

class UnreadLoadButton {
  render() {
    const { count, href } = this.props;
    return (
      <button className="button button--small button--grey">
        {i18n.t('buttons.unread_load.unread_entries_count', { count })}
        <a href={href}>
          {i18n.t('buttons.unread_load.show_unread')}
        </a>
      </button>
    );
  }
}

UnreadLoadButton.propTypes = propTypes;

export default UnreadLoadButton;
