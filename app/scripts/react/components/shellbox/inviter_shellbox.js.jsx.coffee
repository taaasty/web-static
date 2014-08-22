###* @jsx React.DOM ###

window.InviterShellBox = React.createClass

  propTypes:
    fixed:          React.PropTypes.bool
    isDisabled:     React.PropTypes.bool
    onProcessStart: React.PropTypes.func.isRequired
    onProcessEnd:   React.PropTypes.func.isRequired

  render: ->
    inviterClasses = React.addons.classSet
      'inviter':        true
      'inviter--fixed': @props.fixed

    boxStyle = 'background-image': "url(http://thumbor0.tasty0.ru/unsafe/712x416/smart//images/inviter_bg.jpg)"

    unless @props.isDisabled
      footer = `<div className="inviter__footer">
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
                </div>`

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
                      <Shellbox_VkontakteAuthButton onProcessStart={ this.props.onProcessStart }
                                                    onProcessEnd={ this.props.onProcessEnd } />
                    </div>
                    <div className="inviter__spacer" />
                    <div className="inviter__stats">
                      <div className="inviter__stats-item">
                        <strong>14 000 000+</strong>
                        записей
                      </div>
                      <div className="inviter__stats-item">
                        <strong>200 000+</strong>
                        пользователей
                      </div>
                      <div className="inviter__stats-item">
                        <strong><span className="tilde">&#126;</span>30</strong>
                        секунд чтобы начать
                      </div>
                    </div>
                    { footer }
                  </div>
                </div>
              </div>
            </div>`

  gotoEmailSignup: (event) ->
    event.preventDefault()
    event.stopPropagation()
    ReactApp.shellbox.show EmailSignupShellBox

  gotoSelectSignin: (event) ->
    event.preventDefault()
    event.stopPropagation()
    ReactApp.shellbox.show SelectSigninShellBox