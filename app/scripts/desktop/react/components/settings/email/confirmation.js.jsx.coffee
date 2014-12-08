###* @jsx React.DOM ###

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
       `<span>
          Емейл не подтвержден. <a title="Отправить" onClick={ this.handleClick }>Отправить</a> подтверждение снова (или проверьте в папке «Спам»)
        </span>`
      when SENDING_STATE then 'Отправляем письмо..'
      when SENT_STATE    then 'Отправлено письмо на электронный ящик (проверьте в папке «Спам»).'
      when ERROR_STATE   then 'Ошибка: ' + @state.errorMessage
      else console.warn 'Unknown currentState of SettingsEmailConfirmation component', @state.currentState

    return `<p className="settings__error">{ message }</p>`

  isConfirmation: -> @props.confirmationEmail? && @props.confirmationEmail isnt @props.email

  activateSendingState: -> @setState(currentState: SENDING_STATE)
  activateSentState:    -> @setState(currentState: SENT_STATE)
  activateErrorState:   -> @setState(currentState: ERROR_STATE)

  handleClick: ->
    @props.onResend {
      beforeSend: @activateSendingState
      success: @activateSentState
      error: (data) =>
        @setState {
          currentState: ERROR_STATE
          errorMessage: data.responseJSON.error
        }
    }

module.exports = SettingsEmailConfirmation