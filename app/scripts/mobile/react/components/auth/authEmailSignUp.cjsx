NotifyController          = require '../../controllers/notify'
SessionsViewActions       = require '../../actions/view/sessions'
ComponentMixin            = require '../../mixins/component'
AuthEmailEmailField       = require './fields/emailEmail'
AuthEmailPasswordField    = require './fields/emailPassword'
AuthEmailNicknameField    = require './fields/emailNickname'
AuthEmailSubmitButton     = require './buttons/emailSubmit'
AuthAlreadyRegisteredLink = require './links/alreadyRegistered'

#FIXME: Remove from global when implement react-router
global.AuthEmailSignUp = React.createClass
  displayName: 'AuthEmailSignUp'
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
              <div className="auth__header-title">
                { i18n.t('auth.email_signup_header') }
              </div>
            </div>
            <div className="auth__body">
              <form onSubmit={ @handleSubmit }>
                <AuthEmailEmailField ref="emailField" />
                <AuthEmailPasswordField ref="passwordField" />
                <AuthEmailNicknameField ref="nicknameField" />
                <div className="auth__buttons">
                  <AuthEmailSubmitButton loading={ @state.loading } />
                </div>
              </form>
            </div>
            <div className="auth__footer">
              <AuthAlreadyRegisteredLink />
            </div>
          </div>
        </div>
      </div>
    </div>

  activateLoadingState:   -> @safeUpdateState(loading: true)
  deactivateLoadingState: -> @safeUpdateState(loading: false)

  isValid: ->
    email    = @refs.emailField.getValue()
    password = @refs.passwordField.getValue()

    switch
      when email.length == 0
        NotifyController.notifyError i18n.t 'messages.auth_empty_email_error'
        false
      when password.length == 0
        NotifyController.notifyError i18n.t 'messages.auth_empty_password_error'
        false
      else true

  signUp: ->
    email    = @refs.emailField.getValue()
    password = @refs.passwordField.getValue()
    nickname = @refs.nicknameField.getValue()

    @activateLoadingState()

    SessionsViewActions.signUp email, password, nickname
      .then (user) =>
        setTimeout (->
          window.location.href = user.tlog_url
        ), 0
      .always @deactivateLoadingState

  handleSubmit: (e) ->
    e.preventDefault()
    @signUp() if @isValid() && !@state.loading

module.exports = AuthEmailSignUp