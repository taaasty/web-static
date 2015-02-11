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
              title="Закрытый дневник?"
              description="Тлог виден только подписчикам, стать которым можно после одобрения. Ну и вам конечно."
              checked={ @state.user.is_privacy }
              onChange={ @updateTempSettings.bind(null, 'is_privacy') } />
          <Settings_Radio
              title="Тлогодень"
              description="Это режим отображения, когда на странице показываются записи только за один день."
              checked={ @state.user.is_daylog }
              onChange={ @updateTempSettings.bind(null, 'is_daylog') } />
          <Settings_Radio
              title="Вы - девушка"
              description="На Тейсти сложилось так, что 7 из 10 пользователей – это девушки. Поэтому по-умолчанию для всех именно такая настройка."
              checked={ @state.user.is_female }
              onChange={ @updateTempSettings.bind(null, 'is_female') } />
          <SettingsEmail
              email={ @state.user.email }
              confirmationEmail={ @state.user.confirmation_email } />
          <Settings_Radio
              title="Уведомления"
              description="Отправлять мне емейл уведомления обо всех новых комментариях, подписчиках и личных сообщениях?"
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