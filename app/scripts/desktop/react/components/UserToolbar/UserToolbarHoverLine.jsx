import React, { PropTypes } from 'react';

function UserToolbarHoverLine({ onMouseEnter }) {
  return <div className="toolbar__hover-line" onMouseEnter={onMouseEnter} />;
}

UserToolbarHoverLine.propTypes = {
  onMouseEnter: PropTypes.func.isRequired,
};

export default UserToolbarHoverLine;
