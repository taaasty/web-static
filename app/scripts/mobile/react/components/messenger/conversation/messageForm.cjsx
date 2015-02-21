NotifyController             = require '../../../controllers/notify'
MessengerViewActions         = require '../../../actions/view/messenger'
ConversationMessageFormField = require './messageForm/field'
{ PropTypes } = React

ConversationMessageForm = React.createClass
  displayName: 'ConversationMessageForm'

  propTypes:
    convID: PropTypes.number.isRequired

  render: ->
    <form className="message-form">
      <button className="message-form__submit"
              onClick={ @handleClick }>
        Отпр
      </button>
      <ConversationMessageFormField
          ref="formField"
          onSubmit={ @createMessage } />
    </form>

  isValid: ->
    messageText = @refs.formField.getValue()

    if messageText.length == 0
      NotifyController.notifyError 'Сообщение не может быть пустым'
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