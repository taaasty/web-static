/*global i18n, gon */
import React, { Component, PropTypes } from 'react';
import Popup from '../Popup';
import PopupArea from '../Popup/Area';
import SettingsHeader from './SettingsHeader';
import SettingsRadioItem from './SettingsRadioItem';
import SettingsPhone from './SettingsPhone';
import SettingsEmail from './email/email';
import SettingsPassword from './password/password';
import SettingsLanguage from './SettingsLanguage';
import SettingsAccounts from './SettingsAccounts';
import SettingsPremium from './SettingsPremium';
import TastyLockingAlertController from '../../controllers/TastyLockingAlertController';
import NoticeService from '../../services/Notice';
import { updateUserProfile, updateUserpic } from '../../actions/CurrentUserActions';
import { CROSSPOST_OUT } from '../../constants/CrosspostConstants';
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
  renderLanguage() {
    return (
      (gon.languages && gon.languages.length > 1) &&
      <SettingsLanguage
        languages={gon.languages}
        onChange={this.updateLanguage}
        title={i18n.t('settings_language_title')}
        value={this.props.currentUser.data.locale}
      />
    );
  }
  render() {
    const { currentUser, onClose } = this.props;
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
                <SettingsPremium expires={user.premiumExpired} />
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
              </div>
            </form>
          </div>
        </Popup>
      </PopupArea>
    );
/*

                <SettingsPhone
                  onUpdate={this.updatePhone}
                  phone={user.phone}
                />
                <SettingsEmail
                  confirmationEmail={user.confirmation_email}
                  email={user.email}
                  onCancel={this.cancelEmailConfirmation}
                  onResend={this.resendEmailConfirmation}
                  onUpdate={this.updateEmail}
                />
                <SettingsRadioItem
                  checked={user.available_notifications}
                  description={i18n.t('settings_notifications_description')}
                  id="availableNotifications"
                  onChange={this.updateAvailableNotifications}
                  title={i18n.t('settings_notifications')}
                />
                {crossposts.facebook &&
                 <SettingsRadioItem
                   checked={crossposts.facebook.crossposting_cd === CROSSPOST_OUT}
                   description={i18n.t('settings_crosspost_description', { context: 'facebook' })}
                   id="fbCrosspost"
                   onChange={this.updateFbCrosspost}
                   title={i18n.t('settings_crosspost', { context: 'facebook' })}
                 />
                }
                 {crossposts.twitter &&
                  <SettingsRadioItem
                    checked={crossposts.twitter.crossposting_cd === CROSSPOST_OUT}
                    description={i18n.t('settings_crosspost_description', { context: 'twitter' })}
                    id="twitterCrosspost"
                    onChange={this.updateTwitterCrosspost}
                    title={i18n.t('settings_crosspost', { context: 'twitter' })}
                  />
                 }
                  <SettingsPassword onUpdate={this.updatePassword} />
                  {this.renderLanguage()}
                  <SettingsAccounts accounts={[]} user={user} />
              </div>
            </form>
          </div>
        </Popup>
      </PopupArea>
    );
*/
  }
}

SettingsPopup.propTypes = {
  currentUser: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  updateUserProfile: PropTypes.func.isRequired,
  updateUserpic: PropTypes.func.isRequired,
};

export default connect(
  (state, { onClose }) => {
    const crossposts = (state.currentUser.data.authentications || []).reduce((acc, el) => {
      if (el.provider) {
        acc[el.provider] = el;
      }

      return acc;
    }, {});

    return {
      crossposts,
      onClose,
      currentUser: state.currentUser,
    };
  },
  { updateUserProfile, updateUserpic }
)(SettingsPopup);
