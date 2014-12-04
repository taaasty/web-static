###* @jsx React.DOM ###

window.Auth = React.createClass

  propTypes:
    fixed: React.PropTypes.bool

  render: ->
    inviterClasses = React.addons.classSet {
      'inviter': true
      'inviter--fixed': @props.fixed
    }

    boxStyle = 'background-image': 'url(http://thumbor0.tasty0.ru/unsafe/712x416/smart//images/inviter_bg.jpg)'

    return `<div className={ inviterClasses }>
              <div style={ boxStyle }
                   className="inviter__box">
                <div className="inviter__overlay" />
                <div className="grid-full">
                  <div className="grid-full__middle">

                    <div className="inviter__logo">
                      <i className="icon icon--ribbon" />
                    </div>

                    <div className="inviter__title">
                      Тейсти – это дневник в который хочется писать каждый день
                    </div>

                    <div className="inviter__text">
                      Выберите способ входа/регистрации
                    </div>

                    <div className="inviter__actions">
                      <a className="vk-auth-button"
                         href={ ApiRoutes.omniauth_url('vkontakte') }
                         onClick={ this.handleVkClick }>
                        Вконтакте
                      </a>
                      <a className="fb-auth-button"
                         href={ ApiRoutes.omniauth_url('facebook') }
                         onClick={ this.handleFacebookClick }>
                        Facebook
                      </a>
                      <a href="http://taaasty.ru/auth/site"
                         className="site-auth-button"
                         onClick={ this.handleEmailClick }>
                        Емейл или Ник
                      </a>
                    </div>

                    <div className="inviter__spacer" />

                    <div className="inviter__stats">
                      <div className="inviter__stats-item">
                        <strong>{ this.getEntriesCount() }</strong>
                        записей
                      </div>
                      <div className="inviter__stats-item">
                        <strong>{ this.getUsersCount() }</strong>
                        пользователей
                      </div>
                      <div className="inviter__stats-item">
                        <strong>
                          <span className="tilde">&#126;</span>30
                        </strong>секунд чтобы начать
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>`

  getEntriesCount: ->
    TastyUtils.formatNumber( window.gon.app_stats.entries_count, 100 ) + '+'

  getUsersCount: ->
    TastyUtils.formatNumber( window.gon.app_stats.users_count, 100 ) + '+'

  handleVkClick: ->
    # ReactApp.shellbox.show VkAuthorizationShellbox

  handleFacebookClick: ->
    # ReactApp.shellbox.show FacebookAuthorizationShellbox

  handleEmailClick: (e) ->
    e.preventDefault()
    ReactApp.shellbox.show Email