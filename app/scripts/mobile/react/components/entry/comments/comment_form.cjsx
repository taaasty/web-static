{ PropTypes } = React

#TODO: i18n
BUTTON_TITLE      = 'Отпр'
FIELD_PLACEHOLDER = 'Добавить комментарий'

module.exports = React.createClass
  displayName: 'EntryComments_CommentForm'

  propTypes:
    user: PropTypes.object.isRequired

  render: ->
    <form className="comment-form">
      <button
          className="comment-form__submit"
          onClick={ @handleClick }>
        { BUTTON_TITLE }
      </button>
      <div className="comment-form__field">
        <textarea
            placeholder={ FIELD_PLACEHOLDER }
            className="comment-form__field-textarea" />
      </div>
    </form>

  handleClick: (e) ->
    e.preventDefault()
    console.log 'submit'