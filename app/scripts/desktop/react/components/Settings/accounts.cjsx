#TODO: Refactor
SettingsAccounts = React.createClass

  propTypes:
    user:     React.PropTypes.object.isRequired
    accounts: React.PropTypes.array.isRequired

  onClickLogout: (ev) ->
    ev.preventDefault()
    href = ev.target.href

    if window.ga
      window.ga('send', 'event', 'Account', 'Logout', {
        hitCallback: () -> window.location.href = href
      })
    else
      window.location.href = href

  render: ->
    anotherAccounts = null

    <div className="settings__item">
      <div className="accounts">
        <div className="account state--active">
          <div className="account__actions">
            <a
              className="button button--outline"
              href={Routes.logout_path()}
              onClick={this.onClickLogout}
            >
              <span className="button__text">
                { i18n.t('settings_accounts_logout_button') }
              </span>
            </a>
          </div>
          <div className="account__info">
            <div className="account__avatar">
              <Avatar
                  userpic={ this.props.user.userpic }
                  name={ this.props.user.name } />
            </div>
            <div className="account__desc">
              <div className="account__name">{ this.props.user.name }</div>
              <div className="account__status">
                { i18n.t('settings_accounts_account_status') }
              </div>
            </div>
          </div>
        </div>
        { anotherAccounts }
      </div>
    </div>

  # anotherAccount: ->
  #   <div className="account">
  #     <div className="account__actions">
  #       <button className="button button--yellow">
  #         <span className="button__text">Переключиться</span>
  #       </button>
  #     </div>
  #     <div className="account__info">
  #       <div className="account__avatar">
  #         <span className="avatar avatar--first">
  #           <span className="avatar__text">N</span>
  #         </span>
  #       </div>
  #       <div className="account__desc">
  #         <div className="account__name">News</div>
  #         <div className="account__status">Нажмите чтобы переключиться</div>
  #       </div>
  #     </div>
  #   </div>

module.exports = SettingsAccounts
