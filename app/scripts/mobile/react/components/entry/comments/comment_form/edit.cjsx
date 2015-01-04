EntryViewActions = require '../../../../actions/view/entry'
CommentForm      = require '../comment_form'
ComponentMixin   = require '../../../../mixins/component'
{ PropTypes } = React

SHOW_STATE    = 'show'
LOADING_STATE = 'loading'

#TODO: i18n
BUTTON_TITLE      = 'Изм'
FIELD_PLACEHOLDER = 'Отредактировать комментарий'

CommentEditForm = React.createClass
  mixins: [ComponentMixin]
  displayName: 'CommentEditForm'

  propTypes:
    comment:      PropTypes.object.isRequired
    onEditFinish: PropTypes.func.isRequired
    onEditCancel: PropTypes.func.isRequired

  getInitialState: ->
    currentState: SHOW_STATE

  render: ->
    <CommentForm
        ref="commentForm"
        text={ @props.comment.comment_html }
        buttonTitle={ BUTTON_TITLE }
        placeholder={ FIELD_PLACEHOLDER }
        disabled={ @isLoadingState() }
        onSubmit={ @editComment }
        onCancel={ @props.onEditCancel } />

  isValid: (text) -> !!text.match(/./) && @props.comment.comment_html isnt text

  isLoadingState: -> @state.currentState is LOADING_STATE

  activateLoadingState: -> @safeUpdateState(currentState: LOADING_STATE)
  activateShowState:    -> @safeUpdateState(currentState: SHOW_STATE)

  editComment: (text) ->
    return @props.onEditCancel() unless @isValid text

    EntryViewActions.editComment @props.comment.id, text
      .then @props.onEditFinish
      .always @activateShowState

module.exports = CommentEditForm

# window.EntryCommentBox_CommentEditFormManager = React.createClass
#   mixins: [RequesterMixin, ComponentManipulationsMixin]

#   propTypes:
#     comment:   React.PropTypes.object.isRequired
#     user:      React.PropTypes.object.isRequired
#     onEditEnd: React.PropTypes.func.isRequired
#     onCancel:  React.PropTypes.func.isRequired

#   getInitialState: ->
#     isEditError:   false
#     isEditLoading: false

#   render: ->
#     <EntryCommentBox_CommentForm ref="commentForm"
#                                  text={ this.props.comment.comment_html }
#                                  user={ this.props.user }
#                                  isLoading={ this.state.isEditLoading }
#                                  onSubmit={ this.onSubmit }
#                                  onCancel={ this.props.onCancel } />

#   onSubmit: (text) ->
#     @setState isEditError: false, isEditLoading: true

#     @createRequest
#       url: ApiRoutes.comments_edit_delete_url @props.comment.id
#       method: 'PUT'
#       data:
#         text: text
#       success: (comment) =>
#         @props.onEditEnd comment
#       error: (data) =>
#         @safeUpdateState isEditError: true
#         TastyNotifyController.errorResponse data
#       complete: =>
#         @safeUpdateState isEditLoading: false