Fluxxor        = require 'fluxxor'
FluxMixin      = Fluxxor.FluxMixin(React)
CommentForm    = require '../commentForm'
ComponentMixin = require '../../../../mixins/component'
{ PropTypes } = React

SHOW_STATE    = 'show'
LOADING_STATE = 'loading'

#TODO: i18n
BUTTON_TITLE      = 'Изм'
FIELD_PLACEHOLDER = 'Отредактировать комментарий'

CommentEditForm = React.createClass
  displayName: 'CommentEditForm'
  mixins: [FluxMixin, ComponentMixin]

  propTypes:
    entryId:      PropTypes.number.isRequired
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

    entryId   = @props.entryId
    commentId = @props.comment.id

    @getFlux().actions.editComment entryId, commentId, text
      .then @props.onEditFinish
      .always @activateShowState

module.exports = CommentEditForm