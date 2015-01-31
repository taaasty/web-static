SHOW_STATE    = 'show'
SENT_STATE    = 'sent'
SENDING_STATE = 'sending'
ERROR_STATE   = 'error'

SettingsEmailConfirmation = React.createClass

  propTypes:
    email:             React.PropTypes.any.isRequired
    confirmationEmail: React.PropTypes.any
    onResend:          React.PropTypes.func.isRequired

  getInitialState: ->
    currentState: SHOW_STATE
    errorMessage: ''

  render: ->
    message = switch @state.currentState
      when SHOW_STATE
        <span>
          { i18n.t('settings_email_not_confirmed') } <a title={ i18n.t('settings_email_resend_mail') } onClick={ this.handleClick }>{ i18n.t('settings_email_resend_mail') }</a> { i18n.t('settings_email_check_spam') }
        </span>
      when SENDING_STATE then i18n.t 'settings_email_confirmation_process'
      when SENT_STATE    then i18n.t 'settings_email_confirmation_sent'
      when ERROR_STATE   then i18n.t 'settings_email_confirmation_error', errorMessage: @state.errorMessage
      else console.warn 'Unknown currentState of SettingsEmailConfirmation component', @state.currentState

    return <p className="settings__error">{ message }</p>

  isConfirmation: -> @props.confirmationEmail? && @props.confirmationEmail isnt @props.email

  activateSendingState: -> @setState(currentState: SENDING_STATE)
  activateSentState:    -> @setState(currentState: SENT_STATE)
  activateErrorState:   -> @setState(currentState: ERROR_STATE)

  handleClick: ->
    @props.onResend
      beforeSend: @activateSendingState
      success: @activateSentState
      error: (data) =>
        @setState
          currentState: ERROR_STATE
          errorMessage: data.responseJSON.error

module.exports = SettingsEmailConfirmation