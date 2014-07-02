###* @jsx React.DOM ###

module.experts = window.SelectSigninShellBox = React.createClass
  gotoEmailSignin: (event)->
    event.preventDefault()
    event.stopPropagation()
    ReactApp.showShellBox EmailSigninShellBox

  gotoEmailSignup: (event)->
    event.preventDefault()
    event.stopPropagation()
    ReactApp.showShellBox EmailSignupShellBox

  render: ->
    return `<div className="form-popup form-popup--select">
              <div className="form-popup__header">
                  <h3 className="form-popup__title">Вход для зарегистрированных</h3>
              </div>
              <div className="form-popup__body">
                  <div className="form-popup__select">
                      <a className="form-popup__select-item is--vkontakte" href={Routes.api.omniauth_url('vkontakte')}>
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


