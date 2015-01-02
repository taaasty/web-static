Comment         = require './comment'
CommentEditForm = require '../comment_form/edit'
ComponentMixin  = require '../../../../mixins/component'
{ PropTypes } = React

SHOW_STATE = 'show'
EDIT_STATE = 'edit'

CommentManager = React.createClass
  displayName: 'CommentManager'
  mixins: [ComponentMixin]

  propTypes:
    comment:  PropTypes.object.isRequired
    entry:    PropTypes.object.isRequired
    onDelete: PropTypes.func.isRequired
    onEdit:   PropTypes.func.isRequired

  getInitialState: ->
    currentState: SHOW_STATE

  render: ->
    switch @state.currentState
      when SHOW_STATE then <Comment {...@props} onEditStart={ @activateEditState } />
      when EDIT_STATE then <CommentEditForm
                               comment={ @props.comment }
                               onEditFinish={ @handleEditFinish }
                               onEditCancel={ @activateShowState } />
      else console.warn? 'Unknown currentState of CommentManager component', @state.currentState

  activateEditState: -> @safeUpdateState(currentState: EDIT_STATE)
  activateShowState: -> @safeUpdateState(currentState: SHOW_STATE)

  handleEditFinish: (comment) ->
    @activateShowState()
    @props.onEdit comment

module.exports = CommentManager
  #   if @state.isEdit
  #     comment = <EntryCommentBox_CommentEditFormManager comment={ this.state.comment }
  #                                                       user={ this.state.comment.user }
  #                                                       onEditEnd={ this.onEditEnd }
  #                                                       onCancel={ this.onCancel } />
  #   else
  #     commentClasses = cx
  #       'comment': true
  #       'state--highlighted': @props.isShared

  #     comment = <EntryCommentBox_Comment comment={ this.state.comment }
  #                                        entryId={ this.props.entryId }
  #                                        entryUrl={ this.props.entryUrl }
  #                                        isShared={ this.props.isShared }
  #                                        onEditStart={ this.onEditStart }
  #                                        onDelete={ this.props.onDelete } />

  #     comment

  # openForm:  -> @setState isEdit: true
  # closeForm: -> @setState isEdit: false

  # onEditEnd: (comment) ->
  #   @setState comment: comment
  #   window.commentsMediator.doFormClosed()

  # onCancel: -> window.commentsMediator.doFormClosed()