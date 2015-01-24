cx                         = require 'react/lib/cx'
ClickOutsideMixin          = require '../../../../../mixins/clickOutside'
CommentActionsButton       = require './actions/buttons/button'
CommentActionsDropdownMenu = require './actions/dropdownMenu'
UserAvatar                 = require '../../../../common/avatar/user'
{ PropTypes } = React

OPEN_STATE  = 'open'
CLOSE_STATE = 'close'

CommentActions = React.createClass
  displayName: 'CommentActions'
  mixins: [ClickOutsideMixin]

  propTypes:
    entry:           PropTypes.object.isRequired
    comment:         PropTypes.object.isRequired
    onEditStart:     PropTypes.func.isRequired
    onCommentDelete: PropTypes.func.isRequired
    onCommentReport: PropTypes.func.isRequired

  getInitialState: ->
    currentState: CLOSE_STATE

  render: ->
    actionsClasses = cx
      'comment__actions': true
      '__open': @isOpenState()

    <div className={ actionsClasses }>
      <CommentActionsButton onClick={ @toggleOpenState } />
      <CommentActionsDropdownMenu {...@props} visible={ @isOpenState() } />
    </div>

  isOpenState: -> @state.currentState is OPEN_STATE

  activateCloseState: -> @setState(currentState: CLOSE_STATE)
  activateOpenState:  -> @setState(currentState: OPEN_STATE)

  toggleOpenState: ->
    if @isOpenState() then @activateCloseState() else @activateOpenState()

module.exports = CommentActions