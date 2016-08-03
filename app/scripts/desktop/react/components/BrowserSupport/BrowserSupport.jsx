/*global i18n */
import React, { PropTypes } from 'react';

function BrowserSupport({ name, version, updateUrl }) {
    let phrase = i18n.t('browser_support_last_version');

  return (
    <div className="browserbar">
      <div className="browserbar__inner">
        {i18n.t('browser_support_update_to', {
          browserName: name,
          browserVersion: version,
        })}
        {' '}
        {updateUrl ? (
          <a href={updateUrl}>
            {phrase}
          </a>
        )
        : phrase}
      </div>
    </div>
  );
}

BrowserSupport.propTypes = {
  name: PropTypes.string.isRequired,
  updateUrl: PropTypes.string,
  version: PropTypes.number.isRequired,
};

export default BrowserSupport;
