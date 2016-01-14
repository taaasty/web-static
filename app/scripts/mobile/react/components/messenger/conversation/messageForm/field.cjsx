_ = require 'lodash'
{ PropTypes } = React

ConversationMessageFormField = React.createClass
  displayName: 'ConversationMessageFormField'

  propTypes:
    disabled: PropTypes.bool.isRequired
    onSubmit: PropTypes.func.isRequired

  render: ->
    <div className="message-form__field">
      <textarea
          ref="textarea"
          disabled={ @props.disabled }
          placeholder={ @getPlaceholder() }
          className="message-form__field-textarea"
          onKeyDown={ @handleKeyDown } />
    </div>

  isEmpty: ->
    @getValue().length == 0

  clear: ->
    this.refs.textarea.value = ''

  getValue: ->
    _.trim this.refs.textarea.value

  getPlaceholder: ->
    if @props.disabled
      i18n.t('placeholders.messenger_cant_talk')
    else
      i18n.t('placeholders.messenger_create_message')

  handleKeyDown: (e) ->
    isSystemKey = (e) ->
      e.shiftKey || e.ctrlKey || e.altKey || e.metaKey

    if e.key is 'Enter' && @isEmpty()
      e.preventDefault()
    else if e.key is 'Enter' && !isSystemKey(e)
      e.preventDefault()
      @props.onSubmit()

module.exports = ConversationMessageFormField