/*global i18n */
import React from 'react';

function DesignSettingsDropZone() {
  return (
    <div className="design-settings__dragzone">
      <div className="design-settings__dragzone-table">
        <div className="design-settings__dragzone-cell">
          <div className="design-settings__dragzone-text">
            {i18n.t('design_settings_dropzone')}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesignSettingsDropZone;
