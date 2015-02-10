CurrentUserStore  = require '../../stores/currentUser'
ConnectStoreMixin = require '../../../../shared/react/mixins/connectStore'
Settings_Radio    = require './common/radio'
SettingsHero      = require './hero'
SettingsEmail     = require './email'
SettingsPassword  = require './password'
SettingsAccounts  = require './accounts'

Settings = React.createClass
  displayName: 'Settings'
  mixins: [ConnectStoreMixin(CurrentUserStore)]

  render: ->
    <div className="settings">
      <form action="?">
        <div className="settings__header">
          <SettingsHero user={ @state.user } />
        </div>
        <div className="settings__body">
          <Settings_Radio
              title="Закрытый дневник?"
              description="Тлог виден только подписчикам, стать которым можно после одобрения. Ну и вам конечно."
              checked={ @state.user.is_privacy } />
          <Settings_Radio
              title="Тлогодень"
              description="Это режим отображения, когда на странице показываются записи только за один день."
              checked={ @state.user.is_daylog } />
          <Settings_Radio
              title="Вы - девушка"
              description="На Тейсти сложилось так, что 7 из 10 пользователей – это девушки. Поэтому по-умолчанию для всех именно такая настройка."
              checked={ @state.user.is_female } />
          <SettingsEmail
              email={ @state.user.email }
              confirmationEmail={ @state.user.confirmation_email } />
          <Settings_Radio
              title="Уведомления"
              description="Отправлять мне емейл уведомления обо всех новых комментариях, подписчиках и личных сообщениях?"
              checked={ @state.user.available_notifications } />
          <SettingsPassword />
          <SettingsAccounts user={ @state.user } />
          <div className="settings__item">
            <button className="settings__submit">Сохранить</button>
          </div>
        </div>
      </form>
    </div>

  getStateFromStore: ->
    user: CurrentUserStore.getUser()

module.exports = Settings