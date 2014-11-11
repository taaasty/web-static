###* @jsx React.DOM ###

window.InviterShellBox = React.createClass

  propTypes:
    fixed: React.PropTypes.bool

  render: ->
    inviterClasses = React.addons.classSet
      'inviter':        true
      'inviter--fixed': @props.fixed

    boxStyle = 'background-image': "url(http://thumbor0.tasty0.ru/unsafe/712x416/smart//images/inviter_bg.jpg)"

    return `<div className={ inviterClasses }>
              <div className="inviter__box" style={ boxStyle }>
                <div className="inviter__overlay" />
                <div className="grid-full">
                  <div className="grid-full__middle">
                    <div className="inviter__logo">
                      <i className="icon icon--ribbon"></i>
                    </div>
                    <div className="inviter__title">Тейсти – это дневник в который хочется писать каждый день</div>
                    <div className="inviter__actions">
                      <Shellbox_VkAuthButton onClick={ this.onVkAuthClick } />
                    </div>
                    <div className="inviter__spacer" />
                    <div className="inviter__stats">
                      <div className="inviter__stats-item">
                        <strong>{ this._getEntriesCount() }</strong>
                        записей
                      </div>
                      <div className="inviter__stats-item">
                        <strong>{ this._getUsersCount() }</strong>
                        пользователей
                      </div>
                      <div className="inviter__stats-item">
                        <strong><span className="tilde">&#126;</span>30</strong>
                        секунд чтобы начать
                      </div>
                    </div>
                    <div className="inviter__footer">
                      <div className="inviter__footer-inner">
                        <a title="У меня нет аккаунта вконтакте"
                           className="inviter__footer-item"
                           onClick={ this.gotoEmailSignup }>
                          У меня нет аккаунта вконтакте
                        </a>
                        <span className="inviter__footer-sep">·</span>
                        <a title="Вы уже зарегистрированы? Войдите"
                           className="inviter__footer-item"
                           onClick={ this.gotoSelectSignin }>
                          Вы уже зарегистрированы? Войдите
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>`

  _getEntriesCount: ->
    TastyUtils.formatNumber( window.gon.app_stats.entries_count, 100 ) + '+'

  _getUsersCount: ->
    TastyUtils.formatNumber( window.gon.app_stats.users_count, 100 ) + '+'

  onVkAuthClick: ->
    ReactApp.shellbox.show VkAuthorizationShellBox

  gotoEmailSignup: (event) ->
    event.preventDefault()
    event.stopPropagation()
    ReactApp.shellbox.show EmailSignupShellBox

  gotoSelectSignin: (event) ->
    event.preventDefault()
    event.stopPropagation()
    ReactApp.shellbox.show SelectSigninShellBox