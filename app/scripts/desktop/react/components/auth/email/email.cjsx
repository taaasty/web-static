EmailFooter        = require './_partials/footer'
EmailLoginField    = require './fields/login'
EmailPasswordField = require './fields/password'
EmailSubmitButton  = require './buttons/submit'
EmailMixin         = require './mixins/email'

window.Email = React.createClass
  mixins: [EmailMixin, ReactShakeMixin, RequesterMixin, ComponentManipulationsMixin]

  propTypes:
    login:    React.PropTypes.string
    password: React.PropTypes.string

  getDefaultProps: ->
    login:    ''
    password: ''

  getInitialState: ->
    formData:
      login:    @props.login
      password: @props.password
    isProcess:       false
    isLoginError:    false
    isPasswordError: false

  render: ->
    footer = <EmailFooter /> unless @state.isProcess

    return <div className="form-popup form-popup--login">
             <div className="form-popup__header">
               <h3 className="form-popup__title">
                 { i18n.t('email_signin_signup_header') }
               </h3>
             </div>
             <div className="form-popup__body">
               <form>
                 <EmailLoginField
                     ref="login"
                     value={ @state.formData.login }
                     isDisabled={ @state.isProcess }
                     isError={ @state.isLoginError }
                     onChange={ @handleLoginChange } />
                 <EmailPasswordField
                     ref="password"
                     value={ @state.formData.password }
                     isDisabled={ @state.isProcess }
                     isError={ @state.isPasswordError }
                     onChange={ @handlePasswordChange } />
                 <EmailSubmitButton
                     isProcess={ @state.isProcess }
                     isDisabled={ @state.isProcess }
                     onSubmit={ @handleSubmit } />
               </form>
             </div>
             { footer }
           </div>