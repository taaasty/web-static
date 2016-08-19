import React, { PropTypes } from 'react';

function DesignSettingsOption({ children, free, name, title }) {
  return (
    <div className={`design-settings__option design-settings__option--${name}`}>
      <div className="design-settings__option-content">
        <span className="design-settings__text ds-absolute-left ds-fadeout-down">
          {title}
          {free &&
           <span className="free">
             free
           </span>
          }
        </span>
        {children}
      </div>
    </div>
  );
}

DesignSettingsOption.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
  ]).isRequired,
  free: PropTypes.bool,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default DesignSettingsOption;
