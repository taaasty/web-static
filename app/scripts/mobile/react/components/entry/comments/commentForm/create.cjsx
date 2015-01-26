CommentForm    = require '../commentForm'
ComponentMixin = require '../../../../mixins/component'
{ PropTypes } = React

BUTTON_TITLE      = -> t 'create_comment_button'
FIELD_PLACEHOLDER = -> t 'create_comment_placeholder'

CommentCreateForm = React.createClass
  displayName: 'CommentCreateForm'

  propTypes:
    entryId:         PropTypes.number.isRequired
    loading:         PropTypes.bool.isRequired
    onCommentCreate: PropTypes.func.isRequired

  render: ->
    <CommentForm
        ref="commentForm"
        buttonTitle={ BUTTON_TITLE() }
        placeholder={ FIELD_PLACEHOLDER() }
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