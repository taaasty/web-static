NotifyController             = require '../../../controllers/notify'
MessengerViewActions         = require '../../../actions/view/messenger'
ConversationMessageFormField = require './messageForm/field'
{ PropTypes } = React

ConversationMessageForm = React.createClass
  displayName: 'ConversationMessageForm'

  propTypes:
    convID: PropTypes.number.isRequired
    canTalk: PropTypes.bool.isRequired

  render: ->
    <form className="message-form">
      <button className="message-form__submit"
              onClick={ @handleClick }>
        { i18n.t('buttons.messenger_create_message') }
      </button>
      <ConversationMessageFormField
          ref="formField"
          disabled={ !@props.canTalk }
          onSubmit={ @createMessage } />
    </form>

  isValid: ->
    messageText = @refs.formField.getValue()

    switch
      when !@props.canTalk
        NotifyController.notifyError i18n.t('messages.messenger_cant_talk_error')
        false
      when messageText.length == 0
        NotifyController.notifyError i18n.t('messages.messenger_empty_message_error')
        false
      else true

  clearForm: ->
    @refs.formField.clear()

  createMessage: ->
    if @isValid()
      messageText = @refs.formField.getValue()
      MessengerViewActions.createMessage @props.convID, messageText
      @clearForm()

  handleClick: (e) ->
    e.preventDefault()
    @createMessage()

module.exports = ConversationMessageForm