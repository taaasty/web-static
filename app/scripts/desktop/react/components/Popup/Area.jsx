import React, { PropTypes } from 'react';

function Area({ onClose, children }) {
  function handleClick(ev) {
    if (ev.target.classList.contains('popup-container__cell')) {
      ev.preventDefault();
      if (typeof onClose === 'function') {
        onClose();
      }
    }
  }

  return (
    <div className="popup-container">
      <div className="popup-container__main">
        <div className="popup-container__cell" onClick={handleClick}>
          {children}
        </div>
      </div>
    </div>
  );
}

Area.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func,
};

export default Area;
