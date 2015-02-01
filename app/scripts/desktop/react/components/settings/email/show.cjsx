SettingsEmailConfirmation = require './confirmation'

SettingsEmailShow = React.createClass
  mixins: [ReactShakeMixin]

  propTypes:
    email:             React.PropTypes.any.isRequired
    confirmationEmail: React.PropTypes.any
    onEditStart:       React.PropTypes.func.isRequired
    onCancel:          React.PropTypes.func.isRequired
    onResend:          React.PropTypes.func.isRequired

  render: ->
    if @isConfirmation()
      email = @props.confirmationEmail
      button = <button className="button button--outline"
                       onClick={ @handleCancelClick }>
                 <span className="button__text">
                   { i18n.t('settings_email_cancel_button') }
                 </span>
               </button>
      confirmation = <SettingsEmailConfirmation
                         email={ email }
                         confirmationEmail={ @props.confirmationEmail }
                         onResend={ @props.onResend } />
    else
      email  = @props.email
      button = <button className="button button--outline"
                       onClick={ @handleEditClick }>
                 <span className="button__text">
                   { i18n.t('settings_email_edit_button') }
                 </span>
               </button>

    return <div className="settings__item settings__item--full">
             <div className="settings__right">{ button }</div>
             <div className="settings__left">
               <h3 className="settings__title">
                 { i18n.t('settings_email') }
               </h3>
               <p className="settings__desc">{ email }</p>
               { confirmation }
             </div>
           </div>

  isConfirmation: ->
    @props.confirmationEmail?

  handleEditClick: (e) ->
    e.preventDefault()
    @props.onEditStart()

  handleCancelClick: (e) ->
    e.preventDefault()
    @props.onCancel()

module.exports = SettingsEmailShow