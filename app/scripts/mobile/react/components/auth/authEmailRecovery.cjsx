classnames = require 'classnames'
ScreenController = require '../../controllers/screen'
NotifyController = require '../../controllers/notify'
SessionsViewActions = require '../../actions/view/sessions'
ComponentMixin = require '../../mixins/component'
EmailLoginField = require './fields/EmailLoginField'
AuthEmailResetButton = require './buttons/emailReset'
AuthRememberedPasswordLink = require './links/rememberedPassword'
{ PropTypes } = React

AuthEmailRecovery = React.createClass
  displayName: 'AuthEmailRecovery'
  mixins: [ComponentMixin]

  propTypes:
    fixed: PropTypes.bool

  getDefaultProps: ->
    fixed: false

  getInitialState: ->
    login: ''
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
                       { i18n.t('auth.email_recovery_header') }
                     </div>
                   </div>
                   <div className="auth__body">
                     <form onSubmit={ @handleSubmit }>
                       <EmailLoginField value={this.state.login} onChange={this.handleLoginChange} />
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
    login = @state.login

    if login.length == 0
      NotifyController.notifyError i18n.t 'messages.auth_empty_login_error'
      false
    else true

  recover: ->
    login = @state.login

    @activateLoadingState()

    SessionsViewActions.recover login
      .then ScreenController.close
      .always @deactivateLoadingState

  handleLoginChange: (login) ->
    @setState({login})

  handleSubmit: (e) ->
    e.preventDefault()
    @recover() if @isValid() && !@state.loading

module.exports = AuthEmailRecovery