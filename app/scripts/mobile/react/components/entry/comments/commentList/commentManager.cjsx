Comment         = require './comment'
CommentEditForm = require '../commentForm/edit'
ComponentMixin  = require '../../../../mixins/component'
{ PropTypes } = React

SHOW_STATE = 'show'
EDIT_STATE = 'edit'

CommentManager = React.createClass
  displayName: 'CommentManager'
  mixins: [ComponentMixin]

  propTypes:
    comment:         PropTypes.object.isRequired
    entry:           PropTypes.object.isRequired
    onCommentEdit:   PropTypes.func.isRequired
    onCommentDelete: PropTypes.func.isRequired
    onCommentReport: PropTypes.func.isRequired

  getInitialState: ->
    currentState: SHOW_STATE

  render: ->
    switch @state.currentState
      when SHOW_STATE then <Comment {...@props} onEditStart={ @activateEditState } />
      when EDIT_STATE then <CommentEditForm
                               comment={ @props.comment }
                               entryId={ @props.entry.id }
                               onEditFinish={ @handleEditFinish }
                               onEditCancel={ @activateShowState } />
      else console.warn? 'Unknown currentState of CommentManager component', @state.currentState

  activateEditState: -> @safeUpdateState(currentState: EDIT_STATE)
  activateShowState: -> @safeUpdateState(currentState: SHOW_STATE)

  handleEditFinish: (text) ->
    commentId = @props.comment.id

    @props.onCommentEdit commentId, text
    @activateShowState()

module.exports = CommentManager