/*global i18n */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import uri from 'urijs';

function PreviousEntriesButton({ href }) {
  return (
    <div className="previous-entries-button-container">
      <div className="previous-entries-button">
        {window.SPA
         ? <Link to={uri(href).path()}>
             {i18n.t('buttons.load_previous_entries')}
           </Link>
         : <a href={href}>
             {i18n.t('buttons.load_previous_entries')}
           </a>
        }
      </div>
    </div>
  );
}

PreviousEntriesButton.propTypes = {
  href: PropTypes.string.isRequired,
};

export default PreviousEntriesButton;
