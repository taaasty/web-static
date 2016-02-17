import React, { PropTypes } from 'react';
import RawSpinner from '../../../../shared/react/components/common/Spinner';

function Spinner({ hasActivities }) {
  //activities содержит количество итераций, после которых спиннер будет скрыт

  return hasActivities
    ? (
      <div className="popup__loader">
        <RawSpinner size={8} />
      </div>
    )
    : <noscript />;
}

Spinner.propTypes = {
  hasActivities: PropTypes.bool.isRequired,
};

export default Spinner;
