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
    const messagesPopup = this.props[POPUP_MESSAGES];

    return (
      <div>
        {this.props[POPUP_USER_ONBOARDING].visible && <UserOnboardingPopup onClose={hideUserOnboardingPopup} />}
        {this.props[POPUP_SETTINGS].visible && <SettingsPopup onClose={hideSettingsPopup} />}
        {this.props[POPUP_DESIGN_SETTINGS].visible && <DesignSettingsPopup onClose={hideDesignSettingsPopup} />}
        {this.props[POPUP_GET_PREMIUM].visible && <GetPremiumPopup onClose={hideGetPremiumPopup} />}
        {this.props[POPUP_PREMIUM].visible && <PremiumPopup onClose={hidePremiumPopup} />}
        {messagesPopup.visible && <MessagesPopup onClose={hideMessagesPopup} userId={messagesPopup.userId} />}
      </div>
    );
  }
}

PopupContainer.propTypes = {
  [POPUP_DESIGN_SETTINGS]: PropTypes.object.isRequired,
  [POPUP_GET_PREMIUM]: PropTypes.object.isRequired,
  [POPUP_MESSAGES]: PropTypes.object.isRequired,
  [POPUP_PREMIUM]: PropTypes.object.isRequired,
  [POPUP_SETTINGS]: PropTypes.object.isRequired,
  [POPUP_USER_ONBOARDING]: PropTypes.object.isRequired,
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
