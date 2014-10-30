###* @jsx React.DOM ###

window.EmailSigninShellBox = React.createClass
  mixins: [ReactShakeMixin, RequesterMixin, ComponentManipulationsMixin]

  propTypes:
    email: React.PropTypes.string

  getInitialState: ->
    inProcess:       false
    isEmailError:    false
    isPasswordError: false

  componentDidMount: ->
    @$emailField    = $( @refs.email.getDOMNode() )
    @$passwordField = $( @refs.password.getDOMNode() )

    @shake() if @props.email?

  render: ->
    emailFieldClasses = React.addons.classSet
      'form-field':         true
      'form-field--simple': true
      'form-field--error':  @state.isEmailError

    passwordFieldClasses = React.addons.classSet
      'form-field':         true
      'form-field--simple': true
      'form-field--error':  @state.isPasswordError

    footer = @renderFooter() unless @state.inProcess

    return `<div className="form-popup form-popup--login">
              <div className="form-popup__header">
                <h3 className="form-popup__title">Вход через емейл</h3>
              </div>
              <div className="form-popup__body">
                <form>
                  <div className="form-popup__item">
                    <div className={ emailFieldClasses }>
                      <input ref="email"
                             placeholder="Электронная почта или имя"
                             autoFocus={ true }
                             value={ this.props.email }
                             required="required"
                             disabled={ this.state.inProcess }
                             className="form-field__input" />
                      <div className="form-field__bg" />
                    </div>
                  </div>
                  <div className="form-popup__item">
                    <div className={ passwordFieldClasses }>
                      <input ref="password"
                             type="password"
                             placeholder="Пароль"
                             required="required"
                             disabled={ this.state.inProcess }
                             className="form-field__input" />
                      <div className="form-field__bg" />
                    </div>
                  </div>
                  <div className="form-popup__submit">
                    <button onClick={ this.onSigninClick }
                            disabled={ this.state.inProcess }
                            className="button button--large button--green-light button--block button--rectangle">
                      <span className="button__text">{ this._getButtonTitle() }</span>
                    </button>
                  </div>
                </form>
              </div>
              { footer }
            </div>`

  renderFooter: ->
   `<div className="form-popup__footer">
      <a href={ ApiRoutes.omniauth_url('vkontakte') }
         title="Войти через Вконтакте"
         className="form-popup__footer-item"
         onClick={ this.onVkAuthClick }>
        Войти через Вконтакте
      </a>
      <span className="form-popup__footer-sep">·</span>
      <a title="Я забыл пароль или почту"
         className="form-popup__footer-item"
         onClick={ this.gotoRecovery }>
        Я забыл пароль или почту
      </a>
    </div>`

  login: ->
    @setState inProcess: true

    @createRequest
      url: ApiRoutes.signin_url()
      data:
        email:    @$emailField.val()
        password: @$passwordField.val()
      method: 'POST'
      dataType: 'JSON'
      success: (data) =>
        TastyNotifyController.notifySuccess "Добро пожаловать, #{ data.name }! Подождите, я перезагружусь.."
        ReactApp.shellbox.close()
        _.defer -> location.reload true
      error: (data) =>
        @shake()

        if data.responseJSON?
          @safeUpdateState passwordError: true if data.responseJSON.error_code == 'user_authenticator/invalid_password'
          @safeUpdateState emailError: true    if data.responseJSON.error_code == 'user_authenticator/user_not_found'

        TastyNotifyController.errorResponse data
      complete: =>
        @safeUpdateState inProcess: false

  _getButtonTitle: -> if @state.inProcess then 'Вхожу..' else 'Войти'

  onSigninClick: (e) ->
    e.preventDefault()

    emailLength    = @$emailField.val().length
    passwordLength = @$passwordField.val().length

    @setState passwordError: false, emailError: false

    if emailLength < 3
      @shake()
      TastyNotifyController.notify 'error', 'Введите Электронную Почту или свой ник на сайте'
      return

    if passwordLength < 3
      @shake()
      TastyNotifyController.notify 'error', 'Введите пароль'
      return

    @login()

  onVkAuthClick: (e) ->
    e.preventDefault()
    
    ReactApp.shellbox.show VkAuthorizationShellBox

  gotoRecovery: (e) ->
    e.preventDefault()

    ReactApp.shellbox.show RecoveryShellBox
