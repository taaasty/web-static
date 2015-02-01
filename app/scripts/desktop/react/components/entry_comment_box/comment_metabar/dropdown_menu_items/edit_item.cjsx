window.EntryCommentBox_CommentMetaBarDropdownMenuEditItem = React.createClass

  propTypes:
    entryId:   React.PropTypes.number.isRequired
    commentId: React.PropTypes.number.isRequired

  render: ->
    <a onClick={ this.onClick }
       title={ i18n.t('edit_comment_item') }
       className="comment__dropdown-item">
      <i className="icon icon--pencil" />
      { i18n.t('edit_comment_item') }
    </a>

  onClick: ->
    window.commentsMediator.doEdit @props.entryId, @props.commentId