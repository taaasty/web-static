/*global i18n */
import React from 'react';

function EntryBrickPinHeader() {
  return (
    <div className="brick__notice">
      <i className="icon icon--pin" />
      {i18n.t('entry.pinned_header')}
    </div>
  );
}

EntryBrickPinHeader.propTypes = {
};

export default EntryBrickPinHeader;
