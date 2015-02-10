UserAvatar = require '../common/avatar/user'
{ PropTypes } = React

SettingsAccounts = React.createClass
  displayName: 'SettingsAccounts'

  propTypes:
    user: PropTypes.object.isRequired
    # accounts: React.PropTypes.array.isRequired

  render: ->
    <div className="settings__item">
      <div className="accounts">
        <div className="account __active">
          <div className="account__actions">
            <a href={ Routes.logout_path() }
               className="account__logout">
              Выйти
            </a>
          </div>
          <div className="account__info">
            <div className="account__avatar">
              <UserAvatar
                  user={ @props.user }
                  size={ 220 } />
            </div>
            <div className="account__desc">
              <div className="account__name">
                { @props.user.slug }
              </div>
              <div className="account__status">
                Активный дневник
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

module.exports = SettingsAccounts