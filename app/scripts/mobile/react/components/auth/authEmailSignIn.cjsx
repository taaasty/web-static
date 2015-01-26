NotifyController         = require '../../controllers/notify'
SessionsViewActions      = require '../../actions/view/sessions'
ComponentMixin           = require '../../mixins/component'
AuthEmailLoginField      = require './fields/emailLogin'
AuthEmailPasswordField   = require './fields/emailPassword'
AuthEmailSubmitButton    = require './buttons/emailSubmit'
AuthNotRegisteredYetLink = require './links/notRegisteredYet'
AuthForgotPasswordLink   = require './links/forgotPassword'

HEADER_TITLE         = -> t 'email_signin_header'
EMPTY_LOGIN_ERROR    = -> t 'empty_login_error'
EMPTY_PASSWORD_ERROR = -> t 'empty_password_error'

#FIXME: Remove from global when implement react-router
window.AuthEmailSignIn = React.createClass
  displayName: 'AuthEmailSignIn'
  mixins: [ComponentMixin]

  getInitialState: ->
    loading: false

  render: ->
    <div className="auth">
      <div className="auth__grid-table">
        <div className="auth__grid-cell">
          <div style={{ backgroundImage: 'url(../../images/images/Polly-73.jpg)' }}
               className="auth__bg" />
          <div className="auth__section">
            <div className="auth__header">
              <div className="auth__header-title">{ HEADER_TITLE() }</div>
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
              <AuthNotRegisteredYetLink />
              <span className="auth__footer-sep">&middot;</span>
              <AuthForgotPasswordLink />
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
        NotifyController.notifyError EMPTY_LOGIN_ERROR()
        false
      when password.length == 0
        NotifyController.notifyError EMPTY_PASSWORD_ERROR()
        false
      else true

  signIn: ->
    login    = @refs.loginField.getValue()
    password = @refs.passwordField.getValue()

    @activateLoadingState()

    SessionsViewActions.signIn login, password
      .then =>
        setTimeout (->
          window.location.reload true
        ), 0
      .always @deactivateLoadingState

  handleSubmit: (e) ->
    e.preventDefault()
    @signIn() if @isValid() && !@state.loading

module.exports = AuthEmailSignIn