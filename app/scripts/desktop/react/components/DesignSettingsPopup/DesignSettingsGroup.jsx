import React, { PropTypes } from 'react';

function DesignSettingsGroup({ children, title }) {
  return (
    <section className="design-settings__group">
      <header className="design-settings__group-header">
        {title}
      </header>
      <div className="design-settings__group-content">
        {children}
      </div>
    </section>
  );
}

DesignSettingsGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
  ]),
  title: PropTypes.string.isRequired,
};

export default DesignSettingsGroup;
