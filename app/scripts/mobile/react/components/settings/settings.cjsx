_                  = require 'lodash'
CurrentUserStore   = require '../../stores/currentUser'
ConnectStoreMixin  = require '../../../../shared/react/mixins/connectStore'
SettingsMixin      = require './mixins/settings'
Settings_Radio     = require './common/radio'
SettingsSaveButton = require './buttons/save'
SettingsHero       = require './hero'
SettingsEmail      = require './email'
SettingsPassword   = require './password'
SettingsAccounts   = require './accounts'

Settings = React.createClass
  displayName: 'Settings'
  mixins: [ConnectStoreMixin(CurrentUserStore), SettingsMixin]

  getInitialState: ->
    tempSettings: {}

  render: ->
    <div className="settings">
      <form>
        <div className="settings__header">
          <SettingsHero
              user={ @state.user }
              onSlugChange={ @updateTempSettings.bind(null, 'slug') }
              onTitleChange={ @updateTempSettings.bind(null, 'title') } />
        </div>
        <div className="settings__body">
          <Settings_Radio
              title={ i18n.t('settings.privacy_header') }
              description={ i18n.t('settings.privacy_description') }
              checked={ @state.user.is_privacy }
              onChange={ @updateTempSettings.bind(null, 'is_privacy') } />
          <Settings_Radio
              title={ i18n.t('settings.daylog_header') }
              description={ i18n.t('settings.daylog_description') }
              checked={ @state.user.is_daylog }
              onChange={ @updateTempSettings.bind(null, 'is_daylog') } />
          <Settings_Radio
              title={ i18n.t('settings.female_header') }
              description={ i18n.t('settings.female_description') }
              checked={ @state.user.is_female }
              onChange={ @updateTempSettings.bind(null, 'is_female') } />
          <SettingsEmail
              email={ @state.user.email }
              confirmationEmail={ @state.user.confirmation_email } />
          <Settings_Radio
              title={ i18n.t('settings.available_notifications_header') }
              description={ i18n.t('settings.available_notifications_description') }
              checked={ @state.user.available_notifications }
              onChange={ @updateTempSettings.bind(null, 'available_notifications') } />
          <SettingsPassword
              ref="passwordSetting"
              onChange={ @updateTempSettings.bind(null, 'password') }
              onUndo={ @undoTempSetting.bind(null, 'password') } />
          <SettingsAccounts user={ @state.user } />
          <SettingsSaveButton onClick={ @saveSettings } />
        </div>
      </form>
    </div>

  updateTempSettings: (key, value) ->
    newTempSettings = _.clone @state.tempSettings
    newTempSettings[key] = value
    @setState(tempSettings: newTempSettings)

  undoTempSetting: (key) ->
    newTempSettings = _.omit @state.tempSettings, key
    @setState(tempSettings: newTempSettings)

  resetTempSettings: ->
    @refs.passwordSetting.resetFields()
    @setState(tempSettings: {})

  getStateFromStore: ->
    user: CurrentUserStore.getUser()

module.exports = Settings