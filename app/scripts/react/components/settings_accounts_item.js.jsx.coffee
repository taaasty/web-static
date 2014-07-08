###* @jsx React.DOM ###

module.experts = window.SettingsAccountsItem = React.createClass
  propTypes:
    accounts: React.PropTypes.array.isRequired
    user:     React.PropTypes.instanceOf(Backbone.Model).isRequired

  render: ->
    anotherAccounts = null

    `<div className="settings__item">
      <div className="accounts">
        <div className="account state--active">
          <div className="account__actions">
            <a href={Routes.logout_path()} data-method='delete'>
              <button className="button button--outline">
                <span className="button__text">Выйти</span>
              </button>
            </a>
          </div>
          <div className="account__info">
            <div className="account__avatar"> <Avatar name={this.props.user.get('name')} userpic={this.props.user.get('userpic')}/> </div>
            <div className="account__desc">
              <div className="account__name">{this.props.user.get('name')}</div>
              <div className="account__status">Активный дневник</div>
            </div>
          </div>
        </div>
        {anotherAccounts}
      </div>
    </div>
    `

  anotherAccount: ->
    `<div className="account">
      <div className="account__actions">
        <button className="button button--yellow">
          <span className="button__text">Переключиться</span>
        </button>
      </div>
      <div className="account__info">
        <div className="account__avatar">
          <span className="avatar avatar--first">
            <span className="avatar__text">N</span>
          </span>
        </div>
        <div className="account__desc">
          <div className="account__name">News</div>
          <div className="account__status">Нажмите чтобы переключиться</div>
        </div>
      </div>
    </div>
    `



