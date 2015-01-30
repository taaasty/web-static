cx = require 'react/lib/cx'

MOUSE_LEAVE_TIMEOUT = 300
DROPDOWN_CLOSED          = 'closed'
DROPDOWN_OPENED_BY_HOVER = 'openedByHover'
DROPDOWN_OPENED_BY_CLICK = 'openedByClick'

window.EntryCommentBox_CommentMetaBarDropdownMenu = React.createClass
  mixins: [ComponentManipulationsMixin]

  propTypes:
    commentId:   React.PropTypes.number.isRequired
    entryId:     React.PropTypes.number.isRequired
    entryUrl:    React.PropTypes.string.isRequired
    canReport:   React.PropTypes.bool
    canDelete:   React.PropTypes.bool
    canEdit:     React.PropTypes.bool
    onEditStart: React.PropTypes.func
    onDelete:    React.PropTypes.func.isRequired

  getInitialState: ->
    currentState: DROPDOWN_CLOSED

  componentWillUnmount: ->
    clearTimeout @timeout if @timeout

  render: ->
    actionList = []
    menuClasses = cx
      'comment__dropdown': true
      'state--open': @isOpen()

    actionList.push <EntryCommentBox_CommentMetaBarDropdownMenuLinkItem
                        commentId={ this.props.commentId }
                        entryUrl={ this.props.entryUrl }
                        key="link" />
    if @props.canReport
      actionList.push <EntryCommentBox_CommentMetaBarDropdownMenuReportItem
                          commentId={ this.props.commentId }
                          key="report" />
    if @props.canEdit
      actionList.push <EntryCommentBox_CommentMetaBarDropdownMenuEditItem
                          entryId={ this.props.entryId }
                          commentId={ this.props.commentId }
                          key="report" />

    if @props.canDelete
      actionList.push <EntryCommentBox_CommentMetaBarDropdownMenuDeleteItem
                          commentId={ this.props.commentId }
                          onDelete={ this.props.onDelete }
                          key="delete" />

    return <span onMouseEnter={ this.onMouseEnter }
                 onMouseLeave={ this.onMouseLeave }
                 onClick={ this.onClick }
                 className="comment__actions">
             <i className="icon icon--dots" />
             <span className={ menuClasses }>{ actionList }</span>
           </span>

  onMouseEnter: ->
    clearTimeout @timeout if @timeout

    if @state.currentState == DROPDOWN_CLOSED
      @setState currentState: DROPDOWN_OPENED_BY_HOVER

  onMouseLeave: ->
    if @state.currentState == DROPDOWN_OPENED_BY_HOVER
      @timeout = setTimeout ( =>
        @safeUpdateState currentState: DROPDOWN_CLOSED
      ), MOUSE_LEAVE_TIMEOUT

  onClick: ->
    switch @state.currentState
      when DROPDOWN_CLOSED          then @setState currentState: DROPDOWN_OPENED_BY_CLICK
      when DROPDOWN_OPENED_BY_CLICK then @setState currentState: DROPDOWN_CLOSED
      when DROPDOWN_OPENED_BY_HOVER then @setState currentState: DROPDOWN_CLOSED
      else console.error? "Unknown state.currentState", @state.currentState

  isOpen: -> @state.currentState != DROPDOWN_CLOSED