/*global i18n */
import React, { PropTypes } from 'react';

class PreviousEntriesButton {
  render() {
    return (
      <div className="previous-entries-button-container">
        <div className="previous-entries-button">
          <a href={this.props.href}>
            {i18n.t('buttons.load_previous_entries')}
          </a>
        </div>
      </div>
    );
  }
}

PreviousEntriesButton.propTypes = {
  href: PropTypes.string.isRequired,
};

export default PreviousEntriesButton;
