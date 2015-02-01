CommentForm    = require '../commentForm'
ComponentMixin = require '../../../../mixins/component'
{ PropTypes } = React

CommentCreateForm = React.createClass
  displayName: 'CommentCreateForm'

  propTypes:
    entryId:         PropTypes.number.isRequired
    loading:         PropTypes.bool.isRequired
    onCommentCreate: PropTypes.func.isRequired

  render: ->
    <CommentForm
        ref="commentForm"
        buttonTitle={ i18n.t('buttons.comment_create') }
        placeholder={ i18n.t('placeholders.comment_create') }
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