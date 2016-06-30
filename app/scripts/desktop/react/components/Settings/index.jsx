/*global i18n, gon */
import React, { createClass } from 'react';
import SettingsHeader from './header';
import SettingsRadioItem from './SettingsRadioItem';
import SettingsPhone from './SettingsPhone';
import SettingsEmail from './email/email';
import SettingsPassword from './password/password';
import SettingsLanguage from './SettingsLanguage';
import SettingsAccounts from './SettingsAccounts';
import SettingsPremium from './SettingsPremium';
import SettingsMixin from './mixins/settings';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import { CROSSPOST_OUT } from '../../constants/CrosspostConstants';

const Settings = createClass({
  displayName: 'Settings',
  mixins: [
    SettingsMixin, ReactShakeMixin, RequesterMixin,
    ComponentManipulationsMixin, LinkedStateMixin,
  ],

  getInitialState() {
    return this.getStateFromStore();
  },

  componentDidMount() {
    CurrentUserStore.addChangeListener(this._onStoreChange);
  },

  componentWillUnmount() {
    CurrentUserStore.removeChangeListener(this._onStoreChange);
  },

  render() {
    const { user } = this.state;
    const crossposts = (user.authentications || []).reduce((acc, el) => {
      if (el.provider) {
        acc[el.provider] = el;
      }

      return acc;
    }, {});

    return (
      <div className="settings">
        <form>
          <SettingsHeader
            onSlugChange={this.updateSlug}
            onTitleChange={this.updateTitle}
            user={user}
          />
          <div className="settings__body">
            <SettingsPremium expires={user.premium_expired} />
            <SettingsRadioItem
              checked={user.is_privacy}
              description={i18n.t('settings_privacy_description')}
              id="isPrivacy"
              onChange={this.updatePrivacy}
              title={i18n.t('settings_privacy')}
            />
            <SettingsRadioItem
              checked={user.is_daylog}
              description={i18n.t('settings_daylog_description')}
              id="isDaylog"
              onChange={this.updateDaylog}
              title={i18n.t('settings_daylog')}
            />
            <SettingsRadioItem
              checked={user.is_female}
              description={i18n.t('settings_gender_description')}
              id="isFemale"
              onChange={this.updateFemale}
              title={i18n.t('settings_gender')}
            />
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
            <SettingsAccounts
              accounts={[]}
              user={user}
            />
          </div>
        </form>
      </div>
    );
  },

  renderLanguage() {
    return (
      (gon.languages && gon.languages.length > 1) &&
      <SettingsLanguage
        languages={gon.languages}
        onChange={this.updateLanguage}
        title={i18n.t('settings_language_title')}
        value={this.state.user.locale}
      />
    );
  },

  getStateFromStore() {
    return { user: CurrentUserStore.getUser() };
  },

  _onStoreChange() {
    this.setState(this.getStateFromStore());
  },
});

export default Settings;
