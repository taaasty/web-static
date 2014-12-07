###* @jsx React.DOM ###

SettingsHeader    = require './header'
SettingsRadioItem = require './radio_item'
SettingsEmail     = require './email/email'
SettingsPassword  = require './password/password'
SettingsAccounts  = require './accounts'
SettingsMixin     = require './mixins/settings'
LinkedStateMixin  = React.addons.LinkedStateMixin

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
   `<div className="settings">
      <form>
        <SettingsHeader
            user={ this.state.user }
            activitiesHandler={ this.props.activitiesHandler }
            onSlugChange={ this.updateSlug }
            onTitleChange={ this.updateTitle } />

        <div className="settings__body">
          <SettingsRadioItem
              title="Закрытый дневник?"
              description="Тлог виден только подписчикам, стать которым можно после одобрения. Ну и вам конечно."
              checked={ this.state.user.is_privacy }
              key="isPrivacy"
              onChange={ this.updatePrivacy } />

          <SettingsRadioItem
              title="Тлогодень"
              description="Это режим отображения, когда на странице показываются записи только за один день."
              checked={ this.state.user.is_daylog }
              key="isDaylog"
              onChange={ this.updateDaylog } />

          <SettingsRadioItem
              title="Вы - девушка"
              description="На Тейсти сложилось так, что 7 из 10 пользователей – это девушки. Поэтому по-умолчанию для всех именно такая настройка."
              checked={ this.state.user.is_female }
              key="isFemale"
              onChange={ this.updateFemale } />

          <SettingsEmail
              email={ this.state.user.email }
              confirmationEmail={ this.state.user.confirmation_email }
              confirmed={ this.state.user.is_confirmed }
              onUpdate={ this.saveChanges } />

          <SettingsRadioItem
              title="Уведомления"
              description="Отправлять мне емейл уведомления обо всех новых комментариях, подписчиках и личных сообщениях?"
              checked={ this.state.user.available_notifications }
              key="availableNotifications"
              onChange={ this.updateAvailableNotifications } />

          <SettingsPassword onUpdate={ this.saveChanges } />

          <SettingsAccounts
              user={ this.state.user }
              accounts={ [] } />
        </div>
      </form>
    </div>`

  getStateFromStore: ->
    user: CurrentUserStore.getUser()

  _onStoreChange: ->
    @setState @getStateFromStore()