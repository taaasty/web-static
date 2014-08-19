###* @jsx React.DOM ###

DROPDOWN_CLOSED = 'closed'
DROPDOWN_OPENED_BY_HOVER = 'openedByHover'

window.EntryCommentBox_CommentMetaBarDropdownMenu = React.createClass

  propTypes:
    commentId: React.PropTypes.number.isRequired
    entryUrl:  React.PropTypes.string.isRequired
    canReport: React.PropTypes.bool
    canDelete: React.PropTypes.bool
    onDelete:  React.PropTypes.func.isRequired

  getInitialState: ->
    currentState: DROPDOWN_CLOSED

  render: ->
    actionList = []
    menuClasses = React.addons.classSet {
      'comment__dropdown': true
      'state--open': @isOpen()
    }

    actionList.push `<EntryCommentBox_CommentMetaBarDropdownMenuLinkItem commentId={ this.props.commentId }
                                                                         entryUrl={ this.props.entryUrl }
                                                                         key="link" />`
    if @props.canReport
      actionList.push `<EntryCommentBox_CommentMetaBarDropdownMenuReportItem commentId={ this.props.commentId }
                                                                             key="report" />`
    if @props.canDelete
      actionList.push `<EntryCommentBox_CommentMetaBarDropdownMenuDeleteItem commentId={ this.props.commentId }
                                                                             onDelete={ this.props.onDelete }
                                                                             key="delete" />`

    return `<span onMouseEnter={ this.onMouseEnter }
                  onMouseLeave={ this.onMouseLeave }
                  className="comment__actions">
              <i className="icon icon--dots" />
              <span className={ menuClasses }>{ actionList }</span>
            </span>`

  onMouseEnter: ->
    if @state.currentState == DROPDOWN_CLOSED
      @setState currentState: DROPDOWN_OPENED_BY_HOVER

  onMouseLeave: ->
    if @state.currentState == DROPDOWN_OPENED_BY_HOVER
      @setState currentState: DROPDOWN_CLOSED

  isOpen: -> @state.currentState != DROPDOWN_CLOSED