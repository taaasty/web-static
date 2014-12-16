window.EntryCommentBox_CommentMetaBar = React.createClass

  propTypes:
    name:             React.PropTypes.string.isRequired
    commentId:        React.PropTypes.number.isRequired
    commentCreatedAt: React.PropTypes.string.isRequired
    canReport:        React.PropTypes.bool
    canDelete:        React.PropTypes.bool
    canEdit:          React.PropTypes.bool
    entryId:          React.PropTypes.number.isRequired
    entryUrl:         React.PropTypes.string.isRequired
    onDelete:         React.PropTypes.func

  render: ->
    <span className="comment__meta">
      <EntryCommentBox_CommentMetaBarReply name={ this.props.name }
                                           entryId={ this.props.entryId } />
      <span className="comment__dot">·</span>
      <EntryCommentBox_CommentMetaBarDate entryUrl={ this.props.entryUrl }
                                          commentId={ this.props.commentId }
                                          time={ this.props.commentCreatedAt } />
      <span className="comment__dot">·</span>
      <EntryCommentBox_CommentMetaBarDropdownMenu commentId={ this.props.commentId }
                                                  entryId={ this.props.entryId }
                                                  entryUrl={ this.props.entryUrl }
                                                  canReport={ this.props.canReport }
                                                  canDelete={ this.props.canDelete }
                                                  canEdit={ this.props.canEdit }
                                                  onDelete={ this.props.onDelete } />
    </span>