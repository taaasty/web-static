###* @jsx React.DOM ###

window.SelectSigninShellBox = React.createClass

  render: ->
    return `<div className="form-popup form-popup--select">
              <div className="form-popup__header">
                  <h3 className="form-popup__title">Вход для зарегистрированных</h3>
              </div>
              <div className="form-popup__body">
                  <div className="form-popup__select">
                      <a href={ Routes.api.omniauth_url('vkontakte') }
                         className="form-popup__select-item is--vkontakte"
                         onClick={ this.onVkAuthClick }>
                          <div className="form-popup__select-item-i">
                              <div className="form-popup__select-pic">
                                  <i className="icon icon--vkontakte"></i>
                              </div>
                              <div className="form-popup__select-desc">Через Вконтакте</div>
                          </div>
                      </a>
                      <div className="form-popup__select-item is--email" onClick={this.gotoEmailSignin}>
                          <div className="form-popup__select-item-i">
                              <div className="form-popup__select-pic">
                                  <i className="icon icon--email"></i>
                              </div>
                              <div className="form-popup__select-desc">Через электронную почту</div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="form-popup__footer">
                  <a className="form-popup__footer-item" title="или зарегистрироваться, если вы этого не делали" onClick={this.gotoEmailSignup}>или зарегистрироваться, если вы этого не делали</a>
              </div>
          </div>`

  gotoEmailSignin: (event) ->
    event.preventDefault()
    event.stopPropagation()
    ReactApp.shellbox.show EmailSigninShellBox

  gotoEmailSignup: (event) ->
    event.preventDefault()
    event.stopPropagation()
    ReactApp.shellbox.show EmailSignupShellBox

  onVkAuthClick: (e) ->
    e.preventDefault()

    ReactApp.shellbox.show VkAuthorizationShellBox