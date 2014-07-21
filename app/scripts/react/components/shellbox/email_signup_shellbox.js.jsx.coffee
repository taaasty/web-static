###* @jsx React.DOM ###

# Ex .js-subscribe handler
#
module.experts = window.EmailSignupShellBox = React.createClass
  mixins: [ReactShakeMixin]

  getInitialState: ->
    inProcess: false
    email:     ''
    password:  ''
    slug:      ''

  submit: (event)->
    event.preventDefault()
    return if @state.inProcess
    @setState passwordError: false, emailError: false

    user=
      email:    @refs.email.getDOMNode().value
      password: @refs.password.getDOMNode().value
      slug:     @refs.slug.getDOMNode().value


    @setState inProcess: true

    $.ajax
      url:      Routes.api.signup_url()
      method:   'post'
      data:     user
      dataType: 'json'
      success: (data) =>
        @setState inProcess: false
        TastyNotifyController.notify 'success', "Добро пожаловать, #{data.name}! Подождите, я перезагружусь.."
        ReactApp.shellbox.close()

        _.defer -> window.location.href = data.tlog_url

      error: (data) =>
        @setState inProcess: false

        if data.responseJSON? && data.responseJSON.error_code == "user_creator/user_exists"
          ReactApp.shellbox.show EmailSigninShellBox, email: user.email
        else
          @shake()

        TastyNotifyController.errorResponse data

  render: ->
    footer = @renderFooter() unless @state.inProcess
    if @state.inProcess
      button_title = 'Регистрирую..'
    else
      button_title = 'Зарегистрироваться'

    return `<div className="form-popup form-popup--reg">
              <div className="form-popup__header">
                  <h3 className="form-popup__title">Регистрация нового пользователя</h3>
              </div>
              <div className="form-popup__body">
                  <form onSubmit={this.submit}>
                      <div className="form-popup__item">
                          <div className="form-field form-field--simple">
                              <input className="form-field__input" autoFocus={true} disabled={this.state.inProcess} ref="email" type="email" required="required" placeholder="Электронная почта" />
                              <div className="form-field__bg"></div>
                          </div>
                      </div>
                      <div className="form-popup__item">
                          <div className="form-field form-field--simple">
                              <input className="form-field__input" disabled={this.state.inProcess} ref="password" type="password" required="required" placeholder="Пароль" />
                              <div className="form-field__bg"></div>
                          </div>
                      </div>
                      <div className="form-popup__item">
                          <label className="form-field-label" htmlFor="tlog-address">
                              <div className="form-field form-field--simple form-field--binary">
                                  <input id="tlog-address" className="form-field__input" ref="slug" disabled={this.state.inProcess} type="text" placeholder="Адрес дневника" />
                                  <span className="form-field__text">.taaasty.ru</span>
                                  <div className="form-field__bg"></div>
                              </div>
                          </label>
                      </div>
                      <div className="form-popup__submit">
                          <button onSubmit={this.submit} disabled={this.state.inProcess} className="button button--large button--green-light button--block button--rectangle">
                              <span className="button__text">{button_title}</span>
                          </button>
                      </div>
                  </form>
              </div>
              {footer}
          </div>`

  renderFooter: ->
    return `<div className="form-popup__footer">
            <a className="form-popup__footer-item" href={Routes.api.omniauth_url('vkontakte')} title="У вас есть аккаунт вконтакте?">У вас есть акккаунт вконтакте?</a>
            </div>`


