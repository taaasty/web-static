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
        buttonTitle={ i18n.t('create_comment_button') }
        placeholder={ i18n.t('create_comment_placeholder') }
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