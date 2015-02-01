CommentForm    = require '../commentForm'
ComponentMixin = require '../../../../mixins/component'
{ PropTypes } = React

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
        buttonTitle={ i18n.t('buttons.comment_edit') }
        placeholder={ i18n.t('placeholders.comment_edit') }
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