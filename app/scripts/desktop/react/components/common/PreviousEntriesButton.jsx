/*global i18n */
import React, { PropTypes } from 'react';

function PreviousEntriesButton({ href }) {
  return (
    <div className="previous-entries-button-container">
      <div className="previous-entries-button">
        <a href={href}>
          {i18n.t('buttons.load_previous_entries')}
        </a>
      </div>
    </div>
  );
}

PreviousEntriesButton.propTypes = {
  href: PropTypes.string.isRequired,
};

export default PreviousEntriesButton;
