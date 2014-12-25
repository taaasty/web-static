SettingsHeader    = require './header'
SettingsRadioItem = require './radio_item'
SettingsEmail     = require './email/email'
SettingsPassword  = require './password/password'
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
              title="Закрытый дневник?"
              description="Тлог виден только подписчикам, стать которым можно после одобрения. Ну и вам конечно."
              checked={ @state.user.is_privacy }
              id="isPrivacy"
              onChange={ @updatePrivacy } />

          <SettingsRadioItem
              title="Тлогодень"
              description="Это режим отображения, когда на странице показываются записи только за один день."
              checked={ @state.user.is_daylog }
              id="isDaylog"
              onChange={ @updateDaylog } />

          <SettingsRadioItem
              title="Вы - девушка"
              description="На Тейсти сложилось так, что 7 из 10 пользователей – это девушки. Поэтому по-умолчанию для всех именно такая настройка."
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
              title="Уведомления"
              description="Отправлять мне емейл уведомления обо всех новых комментариях, подписчиках и личных сообщениях?"
              checked={ @state.user.available_notifications }
              id="availableNotifications"
              onChange={ @updateAvailableNotifications } />

          <SettingsPassword onUpdate={ @updatePassword } />

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