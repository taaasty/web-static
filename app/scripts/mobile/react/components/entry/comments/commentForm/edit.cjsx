CommentForm    = require '../commentForm'
ComponentMixin = require '../../../../mixins/component'
{ PropTypes } = React

#TODO: i18n
BUTTON_TITLE      = 'Изм'
FIELD_PLACEHOLDER = 'Отредактировать комментарий'

CommentEditForm = React.createClass
  displayName: 'CommentEditForm'

  propTypes:
    entryId:      PropTypes.number.isRequired
    comment:      PropTypes.object.isRequired
    onEditFinish: PropTypes.func.isRequired
    onEditCancel: PropTypes.func.isRequired

  render: ->
    <CommentForm
        ref="commentForm"
        text={ @props.comment.comment_html }
        buttonTitle={ BUTTON_TITLE }
        placeholder={ FIELD_PLACEHOLDER }
        onSubmit={ @editComment }
        onCancel={ @props.onEditCancel } />

  isValid: (text) -> !!text.match(/./) && @props.comment.comment_html isnt text

  clearForm: ->
    @refs.commentForm.clearForm()

  editComment: (text) ->
    return @props.onEditCancel() unless @isValid text
    @props.onEditFinish text
    @clearForm()

module.exports = CommentEditForm