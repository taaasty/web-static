###* @jsx React.DOM ###

module.experts = window.EmailSigninShellBox = React.createClass
  mixins: [ReactShakeMixin]

  propTypes:
    email: React.PropTypes.string

  getInitialState: ->
    #email:         @props.email
    inProcess:     false
    emailError:    false
    passwordError: false

  handleChange: (field, event) ->
    states = 
      passwordError: false
      emailError: false
    states[field] = event.target.value
    @setState states

  submit: (event)->
    event.preventDefault()
    return if @state.inProcess
    @setState passwordError: false, emailError: false

    data=
      email:    @refs.email.state.value
      password: @refs.password.state.value

    if data.email.length<6
      @shake()
      TastyNotifyController.notify 'error', 'Введите Электронную Почту'
      return

    if data.password.length<3
      @shake()
      TastyNotifyController.notify 'error', 'Введите пароль'
      return

    @setState inProcess: true

    $.ajax
      url:      Routes.api.signin_url()
      method:   'post'
      data:     data
      dataType: 'json'
      success: (data) =>
        @setState inProcess: false
        TastyNotifyController.notify 'success', "Добро пожаловать, #{data.name}! Подождите, я перезагружусь.."
        ReactApp.closeShellBox()
        _.defer -> location.reload true
      error: (data) =>
        @setState inProcess: false

        @shake()

        if data.responseJSON?
          @setState passwordError: true if data.responseJSON.error_code == 'user_authenticator/invalid_password'
          @setState emailError: true    if data.responseJSON.error_code == 'user_authenticator/user_not_found'

        TastyNotifyController.errorResponse data


  componentDidMount: ->
    @shake() if @props.email?

  gotoRecovery: (event)->
    event.preventDefault()
    event.stopPropagation()
    ReactApp.showShellBox RecoveryShellBox

  render: ->
    if @state.inProcess
      button_title = 'Вхожу..'
    else
      button_title = 'Войти'

    if @state.emailError
      emailErrorClass = 'form-field--error'
    else
      emailErrorClass = ''

    if @state.passwordError
      passwordErrorClass = 'form-field--error'
    else
      passwordErrorClass = ''


    footer = @renderFooter() unless @state.emailError || @state.passwordError || @state.inProcess

    return `<div className="form-popup form-popup--login">
              <div className="form-popup__header">
                <h3 className="form-popup__title">Вход через емейл</h3>
              </div>
              <div className="form-popup__body">
                <form onSubmit={this.submit}>
                  <div className="form-popup__item">
                    <div className={"form-field form-field--simple " + emailErrorClass}>
                      <input ref='email' autoFocus={true} value={this.props.email} disabled={this.state.inProcess} className="form-field__input" required="required" type="email" placeholder="Электронная почта" />
                      <div className="form-field__bg"></div>
                    </div>
                  </div>
                  <div className="form-popup__item">
                    <div className={"form-field form-field--simple " + passwordErrorClass}>
                      <input ref='password' disabled={this.state.inProcess} className="form-field__input" required="required" type="password" placeholder="Пароль" />
                      <div className="form-field__bg"></div>
                    </div>
                  </div>
                  <div className="form-popup__submit">
                    <button disabled={this.state.inProcess} className="button button--large button--green-light button--block button--rectangle">
                      <span className="button__text">{button_title}</span>
                    </button>
                  </div>
                </form>
              </div>
              {footer}
          </div>`


  renderFooter: ->
    return `<div className="form-popup__footer">
                  <a className="form-popup__footer-item" href={Routes.api.omniauth_url('vkontakte')} title="Войти через Вконтакте" onClick={this.gotoVkontakte}>Войти через Вконтакте</a>
                   <span className="form-popup__footer-sep">·</span>
                  <a className="form-popup__footer-item" href="#recovery_password" title="Я забыл пароль или почту" onClick={this.gotoRecovery}>Я забыл пароль или почту</a>
                </div>`

