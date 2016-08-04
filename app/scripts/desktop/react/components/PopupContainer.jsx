/*global gon */
import React, { Component, PropTypes } from 'react';
import {
  hideUserOnboardingPopup,
  showUserOnboardingPopup,
  hideSettingsPopup,
  hideDesignSettingsPopup,
  showGetPremiumPopup,
  hideGetPremiumPopup,
  showPremiumPopup,
  hidePremiumPopup,
  hideMessagesPopup,
  POPUP_USER_ONBOARDING,
  POPUP_SETTINGS,
  POPUP_DESIGN_SETTINGS,
  POPUP_GET_PREMIUM,
  POPUP_PREMIUM,
  POPUP_MESSAGES,
} from '../actions/AppStateActions';
import { connect } from 'react-redux';
import UserOnboardingPopup from './UserOnboardingPopup';
import SettingsPopup from './SettingsPopup';
import DesignSettingsPopup from './DesignSettingsPopup';
import GetPremiumPopup from './PremiumPopup/GetPremiumPopup';
import PremiumPopup from './PremiumPopup';
import MessagesPopup from '../messaging/components/MessagesPopup';
import NoticeService from '../services/Notice';

const NOTIFY_TIMEOUT = 5000;

class PopupContainer extends Component {
  componentWillMount() {
    const {
      showUserOnboardingPopup,
      showGetPremiumPopup,
      showPremiumPopup,
    } = this.props;

    if (typeof gon !== 'undefined') {
      if (gon.premium_popup) {
        showPremiumPopup();
      } else if (gon.premium_popup_fail) {
        showGetPremiumPopup();
        NoticeService.notifyError(gon.premium_popup_fail, NOTIFY_TIMEOUT);
      } else if (gon.showUserOnboarding) {
        showUserOnboardingPopup();
      }
    }

    window._newPopupActions = {
      showUserOnboardingPopup,
      showGetPremiumPopup,
      showPremiumPopup,
    };
  }
  render() {
    const {
      hideDesignSettingsPopup,
      hideSettingsPopup,
      hideUserOnboardingPopup,
      hideGetPremiumPopup,
      hidePremiumPopup,
      hideMessagesPopup,
    } = this.props;

    return (
      <div>
        {this.props[POPUP_USER_ONBOARDING] && <UserOnboardingPopup onClose={hideUserOnboardingPopup} />}
        {this.props[POPUP_SETTINGS] && <SettingsPopup onClose={hideSettingsPopup} />}
        {this.props[POPUP_DESIGN_SETTINGS] && <DesignSettingsPopup onClose={hideDesignSettingsPopup} />}
        {this.props[POPUP_GET_PREMIUM] && <GetPremiumPopup onClose={hideGetPremiumPopup} />}
        {this.props[POPUP_PREMIUM] && <PremiumPopup onClose={hidePremiumPopup} />}
        {this.props[POPUP_MESSAGES] && <MessagesPopup onClose={hideMessagesPopup} />}
      </div>
    );
  }
}

PopupContainer.propTypes = {
  [POPUP_DESIGN_SETTINGS]: PropTypes.bool.isRequired,
  [POPUP_GET_PREMIUM]: PropTypes.bool.isRequired,
  [POPUP_MESSAGES]: PropTypes.bool.isRequired,
  [POPUP_PREMIUM]: PropTypes.bool.isRequired,
  [POPUP_SETTINGS]: PropTypes.bool.isRequired,
  [POPUP_USER_ONBOARDING]: PropTypes.bool.isRequired,
  hideDesignSettingsPopup: PropTypes.func.isRequired,
  hideGetPremiumPopup: PropTypes.func.isRequired,
  hideMessagesPopup: PropTypes.func.isRequired,
  hidePremiumPopup: PropTypes.func.isRequired,
  hideSettingsPopup: PropTypes.func.isRequired,
  hideUserOnboardingPopup: PropTypes.func.isRequired,
  showGetPremiumPopup: PropTypes.func.isRequired,
  showPremiumPopup: PropTypes.func.isRequired,
  showUserOnboardingPopup: PropTypes.func.isRequired,
};

export default connect(
  (state) => state.appState.popups,
  {
    hideUserOnboardingPopup,
    showUserOnboardingPopup,
    hideSettingsPopup,
    hideDesignSettingsPopup,
    showGetPremiumPopup,
    hideGetPremiumPopup,
    showPremiumPopup,
    hidePremiumPopup,
    hideMessagesPopup,
  }
)(PopupContainer);
