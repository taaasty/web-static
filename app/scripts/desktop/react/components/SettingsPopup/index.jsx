/*global i18n, gon, setTimeout */
import React, { Component, PropTypes } from 'react';
import Popup from '../Popup';
import PopupArea from '../Popup/Area';
import SettingsHeader from './SettingsHeader';
import SettingsRadioItem from './SettingsRadioItem';
import SettingsPhone from './SettingsPhone';
import SettingsEmail from './SettingsEmail';
import SettingsPassword from './SettingsPassword';
import SettingsLanguage from './SettingsLanguage';
import SettingsAccounts from './SettingsAccounts';
import SettingsPremium from './SettingsPremium';
import TastyLockingAlertController from '../../controllers/TastyLockingAlertController';
import NoticeService from '../../services/Notice';
import {
  cancelEmailConfirmation,
  resendEmailConfirmation,
  stopFbCrosspost,
  stopTwitterCrosspost,
  updateUserProfile,
  updateUserpic,
  CURRENT_USER_AUTH_FB,
  CURRENT_USER_AUTH_TWITTER,
  CURRENT_USER_CROSSPOST_OUT,
} from '../../actions/CurrentUserActions';
import { showGetPremiumPopup } from '../../actions/AppStateActions';
import { connect } from 'react-redux';

export const NOTIFY_TIMEOUT = 2000;

class SettingsPopup extends Component {
  updateSlug(slug) {
    return this.props.updateUserProfile({ slug })
      .then((data) => {
        TastyLockingAlertController.show({
          title: i18n.t('settings_alert_header'),
          message: i18n.t('settings_redirect', { tlogUrl: data.tlogUrl }),
          action: () => window.location = data.tlogUrl,
        });
      });
  }
  updateTitle(title) {
    return this.props.updateUserProfile({ title })
      .then(() => NoticeService.notifySuccess(i18n.t('settings_change_description_success'), NOTIFY_TIMEOUT));
  }
  updatePrivacy(isPrivacy) {
    return this.props.updateUserProfile({ isPrivacy })
      .then(() => NoticeService.notifySuccess(i18n.t('settings_change_privacy_success'), NOTIFY_TIMEOUT));
  }
  updateDaylog(isDaylog) {
    return this.props.updateUserProfile({ isDaylog })
      .then(() => NoticeService.notifySuccess(i18n.t('settings_change_daylog_success'), NOTIFY_TIMEOUT));
  }
  updateFemale(isFemale) {
    return this.props.updateUserProfile({ isFemale })
      .then(() => NoticeService.notifySuccess(i18n.t('settings_change_gender_success'), NOTIFY_TIMEOUT));
  }
  updateUserpic(ev) {
    return this.props.updateUserpic(ev.target.files[0]);
  }
  updatePhone(phone) {
    return this.props.updateUserProfile({ phone })
      .then(() => NoticeService.notifySuccess(i18n.t('settings_phone_change_success'), NOTIFY_TIMEOUT));
  }
  updateEmail(email) {
    return this.props.updateUserProfile({ email })
      .then(() => NoticeService.notifySuccess(i18n.t('settings_change_email_mail_sent'), NOTIFY_TIMEOUT));
  }
  updateAvailableNotifications(availableNotifications) {
    return this.props.updateUserProfile({ availableNotifications })
      .then(() => NoticeService.notifySuccess(i18n.t('settings_change_notifications_success'), NOTIFY_TIMEOUT));
  }
  updateLanguage(locale) {
    return this.props.updateUserProfile({ locale })
      .then(() => {
        NoticeService.notifySuccess(i18n.t('settings_change_language_success'), NOTIFY_TIMEOUT);
        setTimeout(() => window.location.reload(), NOTIFY_TIMEOUT / 2);
      });
  }
  updatePassword(password) {
    return this.props.updateUserProfile({ password })
      .then(() => NoticeService.notifySuccess(i18n.t('settings_change_password_success'), NOTIFY_TIMEOUT));
  }
  cancelEmailConfirmation() {
    return this.props.cancelEmailConfirmation()
      .then(() => NoticeService.notifySuccess(i18n.t('settings_change_email_canceled'), NOTIFY_TIMEOUT));
  }
  resendEmailConfirmation() {
    return this.props.resendEmailConfirmation()
      .then(() => NoticeService.notifySuccess(i18n.t('settings_change_email_mail_resent'), NOTIFY_TIMEOUT));
  }
  updateFbCrosspost(allow) {
    const { omniauthFbUrl, stopFbCrosspost } = this.props;

    if (allow) {
      if (omniauthFbUrl) {
        TastyLockingAlertController.show({
          title: i18n.t('settings_alert_header'),
          message: i18n.t('settings_alert_redirect', { context: 'facebook' }),
          action: () => window.location.href = omniauthFbUrl,
        });
      } else {
        NoticeService.notifyError(i18n.t('settings_change_crosspost_error', { context: 'facebook' }), NOTIFY_TIMEOUT);
      }
    } else {
      return stopFbCrosspost()
        .then(() => NoticeService.notifySuccess(
          i18n.t('settings_change_crosspost_success', { context: 'facebook' }),
          NOTIFY_TIMEOUT
        ));
    }
  }
  updateTwitterCrosspost(allow) {
    const { omniauthTwitterUrl, stopTwitterCrosspost } = this.props;

    if (allow) {
      if (omniauthTwitterUrl) {
        TastyLockingAlertController.show({
          title: i18n.t('settings_alert_header'),
          message: i18n.t('settings_alert_redirect', { context: 'twitter' }),
          action: () => window.location.href = omniauthTwitterUrl,
        });
      } else {
        NoticeService.notifyError(i18n.t('settings_change_crosspost_error', { context: 'twitter' }), NOTIFY_TIMEOUT);
      }
    } else {
      return stopTwitterCrosspost()
        .then(() => NoticeService.notifySuccess(
          i18n.t('settings_change_crosspost_success', { context: 'twitter' }),
          NOTIFY_TIMEOUT
        ));
    }
  }
  renderLanguage() {
    return (
      (gon.languages && gon.languages.length > 1) &&
      <SettingsLanguage
        languages={gon.languages}
        onChange={this.updateLanguage.bind(this)}
        title={i18n.t('settings_language_title')}
        value={this.props.currentUser.data.locale}
      />
    );
  }
  render() {
    const { crossposts, currentUser, onClose, showGetPremiumPopup } = this.props;
    const { data: user } = currentUser;

    return (
      <PopupArea onClose={onClose}>
        <Popup
          className="popup--settings popup--dark"
          clue="settings"
          onClose={onClose}
          title={i18n.t('settings_header')}
          withBackground 
        >
          <div className="settings">
            <form>
              <SettingsHeader
                handleSlugChange={this.updateSlug.bind(this)}
                handleTitleChange={this.updateTitle.bind(this)}
                handleUserpicChange={this.updateUserpic.bind(this)}
                user={user}
              />
              <div className="settings__body">
                <SettingsPremium
                  expires={user.premiumExpired}
                  showGetPremiumPopup={showGetPremiumPopup}
                />
                <SettingsRadioItem
                  checked={user.isPrivacy}
                  description={i18n.t('settings_privacy_description')}
                  id="isPrivacy"
                  onChange={this.updatePrivacy.bind(this)}
                  title={i18n.t('settings_privacy')}
                />
                <SettingsRadioItem
                  checked={user.isDaylog}
                  description={i18n.t('settings_daylog_description')}
                  id="isDaylog"
                  onChange={this.updateDaylog.bind(this)}
                  title={i18n.t('settings_daylog')}
                />
                <SettingsRadioItem
                  checked={user.isFemale}
                  description={i18n.t('settings_gender_description')}
                  id="isFemale"
                  onChange={this.updateFemale.bind(this)}
                  title={i18n.t('settings_gender')}
                />
                <SettingsPhone
                  onUpdate={this.updatePhone.bind(this)}
                  phone={user.phone}
                />
                <SettingsEmail
                  confirmationEmail={user.confirmationEmail}
                  email={user.email}
                  error={currentUser.errorConfirmEmail}
                  isFetching={currentUser.isFetchingConfirmEmail}
                  isSent={currentUser.isConfirmEmailSent}
                  onCancel={this.cancelEmailConfirmation.bind(this)}
                  onResend={this.resendEmailConfirmation.bind(this)}
                  onUpdate={this.updateEmail.bind(this)}
                />
                <SettingsRadioItem
                  checked={user.availableNotifications}
                  description={i18n.t('settings_notifications_description')}
                  id="availableNotifications"
                  onChange={this.updateAvailableNotifications.bind(this)}
                  title={i18n.t('settings_notifications')}
                />
                {crossposts[CURRENT_USER_AUTH_FB] &&
                 <SettingsRadioItem
                   checked={crossposts[CURRENT_USER_AUTH_FB].crosspostingCd === CURRENT_USER_CROSSPOST_OUT}
                   description={i18n.t('settings_crosspost_description', { context: 'facebook' })}
                   id="fbCrosspost"
                   onChange={this.updateFbCrosspost.bind(this)}
                   title={i18n.t('settings_crosspost', { context: 'facebook' })}
                 />
                }
                {crossposts[CURRENT_USER_AUTH_TWITTER] &&
                 <SettingsRadioItem
                   checked={crossposts[CURRENT_USER_AUTH_TWITTER].crosspostingCd === CURRENT_USER_CROSSPOST_OUT}
                   description={i18n.t('settings_crosspost_description', { context: 'twitter' })}
                   id="twitterCrosspost"
                   onChange={this.updateTwitterCrosspost.bind(this)}
                   title={i18n.t('settings_crosspost', { context: 'twitter' })}
                 />
                }
                <SettingsPassword onUpdate={this.updatePassword.bind(this)} />
                {this.renderLanguage()}
                <SettingsAccounts accounts={[]} user={user} />
              </div>
            </form>
          </div>
        </Popup>
      </PopupArea>
    );
  }
}

SettingsPopup.propTypes = {
  cancelEmailConfirmation: PropTypes.func.isRequired,
  crossposts: PropTypes.object,
  currentUser: PropTypes.object.isRequired,
  omniauthFbUrl: PropTypes.string,
  omniauthTwitterUrl: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  resendEmailConfirmation: PropTypes.func.isRequired,
  showGetPremiumPopup: PropTypes.func.isRequired,
  stopFbCrosspost: PropTypes.func.isRequired,
  stopTwitterCrosspost: PropTypes.func.isRequired,
  updateUserProfile: PropTypes.func.isRequired,
  updateUserpic: PropTypes.func.isRequired,
};

export default connect(
  (state, { onClose }) => {
    const crossposts = (state.currentUser.data.authentications || [])
          .reduce((acc, el) => el.provider ? (acc[el.provider] = el, acc) : acc, {});
    const omniauthFbUrl = crossposts[CURRENT_USER_AUTH_FB] &&
          crossposts[CURRENT_USER_AUTH_FB].omniauthEnableUrl;
    const omniauthTwitterUrl = crossposts[CURRENT_USER_AUTH_TWITTER] &&
          crossposts[CURRENT_USER_AUTH_TWITTER].omniauthEnableUrl;

    return {
      crossposts,
      omniauthFbUrl,
      omniauthTwitterUrl,
      onClose,
      currentUser: state.currentUser,
    };
  },
  {
    cancelEmailConfirmation,
    resendEmailConfirmation,
    stopFbCrosspost,
    stopTwitterCrosspost,
    updateUserProfile,
    updateUserpic,
    showGetPremiumPopup,
  }
)(SettingsPopup);
