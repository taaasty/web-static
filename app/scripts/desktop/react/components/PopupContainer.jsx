/*global gon */
import React, { Component, PropTypes } from 'react';
import {
  hideUserOnboardingPopup,
  showUserOnboardingPopup,
} from '../actions/AppStateActions';
import { connect } from 'react-redux';
import UserOnboardingPopup from './UserOnboardingPopup';

class PopupContainer extends Component {
  componentWillMount() {
    const { showUserOnboardingPopup } = this.props;

    if (gon.showUserOnboarding) {
      showUserOnboardingPopup();
    }

    window._newPopupActions = {
      showUserOnboarding: showUserOnboardingPopup,
    };
  }
  render() {
    const {
      hideUserOnboardingPopup,
      isUserOnboardingPopupVisible,
    } = this.props;

    return (
      <div>
        {isUserOnboardingPopupVisible && <UserOnboardingPopup onClose={hideUserOnboardingPopup} />}
      </div>
    );
  }
}

PopupContainer.propTypes = {
  hideUserOnboardingPopup: PropTypes.func.isRequired,
  isUserOnboardingPopupVisible: PropTypes.bool.isRequired,
  showUserOnboardingPopup: PropTypes.func.isRequired,
};

export default connect(
  (state) => state.appState.popups,
  { hideUserOnboardingPopup, showUserOnboardingPopup }
)(PopupContainer);
