CommentForm    = require '../commentForm'
ComponentMixin = require '../../../../mixins/component'
{ PropTypes } = React

#TODO: i18n
BUTTON_TITLE      = 'Отпр'
FIELD_PLACEHOLDER = 'Добавить комментарий'

CommentCreateForm = React.createClass
  displayName: 'CommentCreateForm'

  propTypes:
    entryId:         PropTypes.number.isRequired
    loading:         PropTypes.bool.isRequired
    onCommentCreate: PropTypes.func.isRequired

  render: ->
    <CommentForm
        ref="commentForm"
        buttonTitle={ BUTTON_TITLE }
        placeholder={ FIELD_PLACEHOLDER }
        disabled={ @props.loading }
        onSubmit={ @createComment } />

  isValid: (text) -> !!text.match /./

  clearForm: ->
    @refs.commentForm.clearForm()

  createComment: (text) ->
    return unless @isValid text
    @props.onCommentCreate text
    @clearForm()

module.exports = CommentCreateForm