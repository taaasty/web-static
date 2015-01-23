NotifyController       = require '../../controllers/notify'
SessionsViewActions    = require '../../actions/view/sessions'
ComponentMixin         = require '../../mixins/component'
AuthEmailLoginField    = require './fields/emailLogin'
AuthEmailPasswordField = require './fields/emailPassword'
AuthEmailSubmitButton  = require './buttons/emailSubmit'

#TODO: i18n
HEADER_TITLE                = 'Вход'
NOT_SIGNED_YET_BUTTON_TEXT  = 'Я еще не зарегистрирован'
FORGOT_PASSWORD_BUTTON_TEXT = 'Я забыл пароль'
EMPTY_LOGIN_ERROR           = 'Вы забыли ввести логин'
EMPTY_PASSWORD_ERROR        = 'Вы забыли ввести пароль'

AuthEmailSignIn = React.createClass
  displayName: 'AuthEmailSignIn'
  mixins: [ComponentMixin]

  getInitialState: ->
    loading: false

  render: ->
    <div className="auth">
      <div className="auth__grid-table">
        <div className="auth__grid-cell">
          <div className="auth__bg" style={{ backgroundImage: 'url(../../images/images/Polly-73.jpg)' }} />
          <div className="auth__section">
            <div className="auth__header">
              <div className="auth__header-title">{ HEADER_TITLE }</div>
            </div>
            <div className="auth__body">
              <form onSubmit={ @handleSubmit }>
                <AuthEmailLoginField ref="loginField" />
                <AuthEmailPasswordField ref="passwordField" />
                <div className="auth__buttons">
                  <AuthEmailSubmitButton loading={ @state.loading } />
                </div>
              </form>
            </div>
            <div className="auth__footer">
              <a href="#"
                 title="Я еще не зарегистрирован"
                 className="auth__footer-link">
                { NOT_SIGNED_YET_BUTTON_TEXT }
              </a>
              <span className="auth__footer-sep">&middot;</span>
              <a href="#"
                 title="Я забыл пароль" 
                 className="auth__footer-link">
                { FORGOT_PASSWORD_BUTTON_TEXT }
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

  activateLoadingState:   -> @safeUpdateState(loading: true)
  deactivateLoadingState: -> @safeUpdateState(loading: false)

  isValid: ->
    login    = @refs.loginField.getValue()
    password = @refs.passwordField.getValue()

    switch
      when login.length == 0
        NotifyController.notifyError EMPTY_LOGIN_ERROR
        false
      when password.length == 0
        NotifyController.notifyError EMPTY_PASSWORD_ERROR
        false
      else true

  login: ->
    login    = @refs.loginField.getValue()
    password = @refs.passwordField.getValue()

    @activateLoadingState()

    SessionsViewActions.login login, password
      .then =>
        setTimeout (->
          window.location.reload true
        ), 0
      .always @deactivateLoadingState

  handleSubmit: (e) ->
    e.preventDefault()
    @login() if @isValid() && !@state.loading

module.exports = AuthEmailSignIn