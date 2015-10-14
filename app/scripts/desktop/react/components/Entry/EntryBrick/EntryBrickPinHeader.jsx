import React, { PropTypes } from 'react';

class EntryBrickPinHeader {
  render() {
    return (
      <div className="brick__notice brick__notice--info">
        {i18n.t('entry.pinned_header')}
      </div>
    );
  }
}

EntryBrickPinHeader.propTypes = {
};

export default EntryBrickPinHeader;
