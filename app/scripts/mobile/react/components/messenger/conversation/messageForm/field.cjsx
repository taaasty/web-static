_ = require 'lodash'
{ PropTypes } = React

ConversationMessageFormField = React.createClass
  displayName: 'ConversationMessageFormField'

  propTypes:
    onSubmit: PropTypes.func.isRequired

  render: ->
    <div className="message-form__field">
      <textarea
          ref="textarea"
          placeholder="Ваше сообщение…"
          className="message-form__field-textarea"
          onKeyDown={ @handleKeyDown } />
    </div>

  isEmpty: ->
    @getValue().length == 0

  clear: ->
    @refs.textarea.getDOMNode().value = ''

  getValue: ->
    _.trim @refs.textarea.getDOMNode().value

  handleKeyDown: (e) ->
    isSystemKey = (e) ->
      e.shiftKey || e.ctrlKey || e.altKey || e.metaKey

    if e.key is 'Enter' && @isEmpty()
      e.preventDefault()
    else if e.key is 'Enter' && !isSystemKey(e)
      e.preventDefault()
      @props.onSubmit()

module.exports = ConversationMessageFormField