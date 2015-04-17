classnames               = require 'classnames'
NotifyController         = require '../../controllers/notify'
SessionsViewActions      = require '../../actions/view/sessions'
ComponentMixin           = require '../../mixins/component'
AuthEmailLoginField      = require './fields/emailLogin'
AuthEmailPasswordField   = require './fields/emailPassword'
AuthEmailSubmitButton    = require './buttons/emailSubmit'
AuthNotRegisteredYetLink = require './links/notRegisteredYet'
AuthForgotPasswordLink   = require './links/forgotPassword'
{ PropTypes } = React

#FIXME: Remove from global when implement react-router
global.AuthEmailSignIn = React.createClass
  displayName: 'AuthEmailSignIn'
  mixins: [ComponentMixin]

  propTypes:
    fixed: PropTypes.bool

  getDefaultProps: ->
    fixed: false

  getInitialState: ->
    loading: false

  render: ->
    authClasses = classnames('auth', {
      'auth--fixed': @props.fixed
    })  
    authBgStyles = backgroundImage: 'url("' + TastySettings.authBackgroundUrl + '")'

    return <div className={ authClasses }>
             <div className="auth__grid-table">
               <div className="auth__grid-cell">
                 <div className="auth__bg"
                      style={ authBgStyles } />
                 <div className="auth__section">
                   <div className="auth__header">
                     <div className="auth__header-title">
                       { i18n.t('auth.email_signin_header') }
                     </div>
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
        NotifyController.notifyError i18n.t 'messages.auth_empty_login_error'
        false
      when password.length == 0
        NotifyController.notifyError i18n.t 'messages.auth_empty_password_error'
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