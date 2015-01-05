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
    comment: PropTypes.object.isRequired
    entry:   PropTypes.object.isRequired

  getInitialState: ->
    currentState: SHOW_STATE

  render: ->
    switch @state.currentState
      when SHOW_STATE then <Comment {...@props} onEditStart={ @activateEditState } />
      when EDIT_STATE then <CommentEditForm
                               entryId={ @props.entry.id }
                               comment={ @props.comment }
                               onEditFinish={ @activateShowState }
                               onEditCancel={ @activateShowState } />
      else console.warn? 'Unknown currentState of CommentManager component', @state.currentState

  activateEditState: -> @safeUpdateState(currentState: EDIT_STATE)
  activateShowState: -> @safeUpdateState(currentState: SHOW_STATE)

module.exports = CommentManager