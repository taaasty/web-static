import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class PopupContainer extends Component {
  render() {
    return (
      <div>
        {isUserOnboardingPopupVisible && <UserOnboardingPopup />}
      </div>
    );
  }
}

export default connect(
  
)(PopupContainer);
