ScreenController           = require '../../controllers/screen'
NotifyController           = require '../../controllers/notify'
SessionsViewActions        = require '../../actions/view/sessions'
ComponentMixin             = require '../../mixins/component'
AuthEmailLoginField        = require './fields/emailLogin'
AuthEmailResetButton       = require './buttons/emailReset'
AuthRememberedPasswordLink = require './links/rememberedPassword'

AuthEmailRecovery = React.createClass
  displayName: 'AuthEmailRecovery'
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
                { i18n.t('email_recovery_header') }
              </div>
            </div>
            <div className="auth__body">
              <form onSubmit={ @handleSubmit }>
                <AuthEmailLoginField ref="loginField" />
                <div className="auth__buttons">
                  <AuthEmailResetButton loading={ @state.loading } />
                </div>
              </form>
            </div>
            <div className="auth__footer">
              <AuthRememberedPasswordLink />
            </div>
          </div>
        </div>
      </div>
    </div>

  activateLoadingState:   -> @safeUpdateState(loading: true)
  deactivateLoadingState: -> @safeUpdateState(loading: false)

  isValid: ->
    login = @refs.loginField.getValue()

    if login.length == 0
      NotifyController.notifyError i18n.t 'empty_login_error'
      false
    else true

  recover: ->
    login = @refs.loginField.getValue()

    @activateLoadingState()

    SessionsViewActions.recover login
      .then ScreenController.close
      .always @deactivateLoadingState

  handleSubmit: (e) ->
    e.preventDefault()
    @recover() if @isValid() && !@state.loading

module.exports = AuthEmailRecovery