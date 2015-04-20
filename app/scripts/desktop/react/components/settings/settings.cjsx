SettingsHeader    = require './header'
SettingsRadioItem = require './radio_item'
SettingsEmail     = require './email/email'
SettingsPassword  = require './password/password'
SettingsLanguage = require './SettingsLanguage'
SettingsAccounts  = require './accounts'
SettingsMixin     = require './mixins/settings'
LinkedStateMixin  = require 'react/lib/LinkedStateMixin'

window.Settings = React.createClass
  mixins: [
    SettingsMixin, 'ReactActivitiesUser', ReactShakeMixin, RequesterMixin
    ComponentManipulationsMixin, LinkedStateMixin
  ]

  getInitialState: ->
    @getStateFromStore()

  componentDidMount: ->
    CurrentUserStore.addChangeListener @_onStoreChange

  componentWillUnmount: ->
    CurrentUserStore.removeChangeListener @_onStoreChange

  render: ->
    <div className="settings">
      <form>
        <SettingsHeader
            user={ @state.user }
            activitiesHandler={ @props.activitiesHandler }
            onSlugChange={ @updateSlug }
            onTitleChange={ @updateTitle } />

        <div className="settings__body">
          <SettingsRadioItem
              title={ i18n.t('settings_privacy') }
              description={ i18n.t('settings_privacy_description') }
              checked={ @state.user.is_privacy }
              id="isPrivacy"
              onChange={ @updatePrivacy } />

          <SettingsRadioItem
              title={ i18n.t('settings_daylog') }
              description={ i18n.t('settings_daylog_description') }
              checked={ @state.user.is_daylog }
              id="isDaylog"
              onChange={ @updateDaylog } />

          <SettingsRadioItem
              title={ i18n.t('settings_gender') }
              description={ i18n.t('settings_gender_description') }
              checked={ @state.user.is_female }
              id="isFemale"
              onChange={ @updateFemale } />

          <SettingsEmail
              email={ @state.user.email }
              confirmationEmail={ @state.user.confirmation_email }
              onUpdate={ @updateEmail }
              onCancel={ @cancelEmailConfirmation }
              onResend={ @resendEmailConfirmation } />

          <SettingsRadioItem
              title={ i18n.t('settings_notifications') }
              description={ i18n.t('settings_notifications_description') }
              checked={ @state.user.available_notifications }
              id="availableNotifications"
              onChange={ @updateAvailableNotifications } />

          <SettingsPassword onUpdate={ @updatePassword } />

          <SettingsLanguage
              title={i18n.t('settings_language_title')}
              value={@state.user.locale}
              languages={[
                {text: 'Русский', value: 'ru'},
                {text: 'English', value: 'en'}
              ]}
              onChange={@updateLanguage} />

          <SettingsAccounts
              user={ @state.user }
              accounts={ [] } />
        </div>
      </form>
    </div>

  getStateFromStore: ->
    user: CurrentUserStore.getUser()

  _onStoreChange: ->
    @setState @getStateFromStore()