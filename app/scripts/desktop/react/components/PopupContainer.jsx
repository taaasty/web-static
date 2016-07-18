/*global gon */
import React, { Component, PropTypes } from 'react';
import {
  hideUserOnboardingPopup,
  showUserOnboardingPopup,
  hideSettingsPopup,
  hideDesignSettingsPopup,
  POPUP_USER_ONBOARDING,
  POPUP_SETTINGS,
  POPUP_DESIGN_SETTINGS,
} from '../actions/AppStateActions';
import { connect } from 'react-redux';
import UserOnboardingPopup from './UserOnboardingPopup';
import SettingsPopup from './SettingsPopup';

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
      hideDesignSettingsPopup,
      hideSettingsPopup,
      hideUserOnboardingPopup,
    } = this.props;

    return (
      <div>
        {this.props[POPUP_USER_ONBOARDING] && <UserOnboardingPopup onClose={hideUserOnboardingPopup} />}
        {this.props[POPUP_SETTINGS] && <SettingsPopup onClose={hideSettingsPopup} />}
      </div>
    );
  }
}

PopupContainer.propTypes = {
  [POPUP_DESIGN_SETTINGS]: PropTypes.bool.isRequired,
  [POPUP_SETTINGS]: PropTypes.bool.isRequired,
  [POPUP_USER_ONBOARDING]: PropTypes.bool.isRequired,
  hideDesignSettingsPopup: PropTypes.func.isRequired,
  hideSettingsPopup: PropTypes.func.isRequired,
  hideUserOnboardingPopup: PropTypes.func.isRequired,
  showUserOnboardingPopup: PropTypes.func.isRequired,
};

export default connect(
  (state) => state.appState.popups,
  {
    hideUserOnboardingPopup,
    showUserOnboardingPopup,
    hideSettingsPopup,
    hideDesignSettingsPopup,
  }
)(PopupContainer);
