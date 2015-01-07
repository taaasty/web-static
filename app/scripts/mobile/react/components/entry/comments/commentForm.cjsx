{ PropTypes } = React

#TODO: i18n
CANCEL_BUTTON_TITLE = 'Отмена'

CommentForm = React.createClass
  displayName: 'CommentForm'

  propTypes:
    text:        PropTypes.string
    buttonTitle: PropTypes.string.isRequired
    placeholder: PropTypes.string.isRequired
    disabled:    PropTypes.bool.isRequired
    onSubmit:    React.PropTypes.func.isRequired
    onCancel:    React.PropTypes.func

  render: ->
    <form className="comment-form">
      { @renderCancelButton() }
      <button className="comment-form__submit"
              onClick={ @handleSubmit }>
        { @props.buttonTitle }
      </button>
      <div className="comment-form__field">
        <textarea
            ref="textField"
            defaultValue={ @props.text }
            placeholder={ @props.placeholder }
            disabled={ @props.disabled }
            className="comment-form__field-textarea"
            onKeyDown={ @handleTextareaKeydown } />
      </div>
    </form>

  renderCancelButton: ->
    if @props.onCancel?
      <button className="comment-form__cancel"
              onClick={ @handleCancel }>
        { CANCEL_BUTTON_TITLE }
      </button>

  clearForm: ->
    @refs.textField.getDOMNode().value = ''

  handleSubmit: (e) ->
    e.preventDefault()
    value = @refs.textField.getDOMNode().value

    @props.onSubmit(value) unless @props.disabled

  handleCancel: (e) ->
    e.preventDefault()
    @props.onCancel()

module.exports = CommentForm