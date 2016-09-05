import React, { PropTypes } from 'react';

function DesignSettingsOptionState({ style, text }) {
  return (
    <span className={`design-settings__state design-settings__state--${style} ds-absolute-right ds-fadeout-right`}>
      <span className="design-settings__state-i">
        {text}
      </span>
    </span>
  );
}

DesignSettingsOptionState.propTypes = {
  style: PropTypes.string.isRequired,
  text: PropTypes.string,
};

export default DesignSettingsOptionState;
