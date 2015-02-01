{ PropTypes } = React

CommentForm = React.createClass
  displayName: 'CommentForm'

  propTypes:
    text:        PropTypes.string
    buttonTitle: PropTypes.string.isRequired
    placeholder: PropTypes.string.isRequired
    disabled:    PropTypes.bool
    onSubmit:    React.PropTypes.func.isRequired
    onCancel:    React.PropTypes.func

  getDefaultProps: ->
    disabled: false

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
        { i18n.t('buttons.comment_edit_cancel') }
      </button>

  clearForm: ->
    @refs.textField.getDOMNode().value = ''

  handleSubmit: (e) ->
    e.preventDefault()
    value = @refs.textField.getDOMNode().value.trim()

    @props.onSubmit(value) unless @props.disabled

  handleCancel: (e) ->
    e.preventDefault()
    @props.onCancel()

module.exports = CommentForm