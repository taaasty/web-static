import React, { PropTypes } from 'react';

function HeroProfileSettingsButton({ onClick }) {
  return (
    <button className="profile-settings-button" onClick={onClick}>
      <i className="icon icon--cogwheel" />
    </button>
  );
}

HeroProfileSettingsButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default HeroProfileSettingsButton;
