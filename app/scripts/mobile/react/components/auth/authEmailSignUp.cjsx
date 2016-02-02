classnames = require 'classnames'
NotifyController = require '../../controllers/notify'
SessionsViewActions = require '../../actions/view/sessions'
ComponentMixin = require '../../mixins/component'
EmailEmailField = require './fields/EmailEmailField'
EmailPasswordField = require './fields/EmailPasswordField'
EmailNicknameField = require './fields/EmailNicknameField'
AuthEmailSubmitButton = require './buttons/emailSubmit'
AuthAlreadyRegisteredLink = require './links/alreadyRegistered'
{ PropTypes } = React

#FIXME: Remove from global when implement react-router
global.AuthEmailSignUp = React.createClass
  displayName: 'AuthEmailSignUp'
  mixins: [ComponentMixin]

  propTypes:
    fixed: PropTypes.bool

  getDefaultProps: ->
    fixed: false

  getInitialState: ->
    email: ''
    password: ''
    nickname: ''
    loading: false

  render: ->
    authClasses = classnames('auth', {
      'auth--fixed': @props.fixed
    })  
    authBgStyles = backgroundImage: 'url("http://taaasty.com/images/Polly-73.jpg")'

    return <div className={ authClasses }>
             <div className="auth__grid-table">
               <div className="auth__grid-cell">
                 <div className="auth__bg"
                      style={ authBgStyles } />
                 <div className="auth__section">
                   <div className="auth__header">
                     <div className="auth__header-title">
                       { i18n.t('auth.email_signup_header') }
                     </div>
                   </div>
                   <div className="auth__body">
                     <form onSubmit={ @handleSubmit }>
                       <EmailEmailField value={this.state.email} onChange={this.handleEmailChange} />
                       <EmailPasswordField value={this.state.password} onChange={this.handlePasswordChange} />
                       <EmailNicknameField value={this.state.nickname} onChange={this.handleNicknameChange} />
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
    email = @state.email
    password = @state.password

    switch
      when email.length == 0
        NotifyController.notifyError i18n.t 'messages.auth_empty_email_error'
        false
      when password.length == 0
        NotifyController.notifyError i18n.t 'messages.auth_empty_password_error'
        false
      else true

  signUp: ->
    email = @state.email
    password = @state.password
    nickname = @state.nickname

    @activateLoadingState()

    SessionsViewActions.signUp email, password, nickname
      .then (user) =>
        setTimeout (->
          window.location.href = user.tlog_url
        ), 0
      .always @deactivateLoadingState

  handleEmailChange: (email) ->
    @setState({email})

  handlePasswordChange: (password) ->
    @setState({password})

  handleNicknameChange: (nickname) ->
    @setState({nickname})

  handleSubmit: (e) ->
    e.preventDefault()
    @signUp() if @isValid() && !@state.loading

module.exports = AuthEmailSignUp