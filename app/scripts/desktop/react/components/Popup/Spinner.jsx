import React from 'react';
import RawSpinner from '../../../../shared/react/components/common/Spinner';

function Spinner() {
  return (
    <div className="popup__loader">
      <RawSpinner size={8} />
    </div>
  );
}

export default Spinner;
