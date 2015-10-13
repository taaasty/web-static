import React, { PropTypes } from 'react';

class PinEntryPopup {
  render() {
    return (
      <div className="pin-entry-popup" />
    );
  }
}

PinEntryPopup.propTypes = {
  entry: PropTypes.object.isRequired,
};

export default PinEntryPopup;
