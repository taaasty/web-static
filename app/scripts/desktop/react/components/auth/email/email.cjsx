EmailFooter        = require './_partials/footer'
EmailLoginField    = require './fields/login'
EmailPasswordField = require './fields/password'
EmailSubmitButton  = require './buttons/submit'
EmailMixin         = require './mixins/email'

#TODO: i18n
TITLE = 'Вход/Регистрация через емейл'

window.Email = React.createClass
  mixins: [EmailMixin, ReactShakeMixin, RequesterMixin, ComponentManipulationsMixin]

  propTypes:
    login:    React.PropTypes.string
    password: React.PropTypes.string

  getDefaultProps: ->
    login:    ''
    password: ''

  getInitialState: ->
    formData: {
      login:    @props.login
      password: @props.password
    }
    isProcess:       false
    isLoginError:    false
    isPasswordError: false

  render: ->
    footer = <EmailFooter /> unless @state.isProcess

    return <div className="form-popup form-popup--login">
             <div className="form-popup__header">
               <h3 className="form-popup__title">{ TITLE }</h3>
             </div>
             <div className="form-popup__body">
               <form>
                 <EmailLoginField
                     value={ this.state.formData.login }
                     isDisabled={ this.state.isProcess }
                     isError={ this.state.isLoginError }
                     onChange={ this.handleLoginChange } />
                 <EmailPasswordField
                     value={ this.state.formData.password }
                     isDisabled={ this.state.isProcess }
                     isError={ this.state.isPasswordError }
                     onChange={ this.handlePasswordChange } />
                 <EmailSubmitButton
                     isProcess={ this.state.isProcess }
                     isDisabled={ this.state.isProcess }
                     onSubmit={ this.handleSubmit } />
               </form>
             </div>
             { footer }
           </div>