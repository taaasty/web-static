window.EntryCommentBox_CommentMetaBarDropdownMenuLinkItem = React.createClass

  propTypes:
    commentId: React.PropTypes.number.isRequired

  render: ->
    <a href={ this._getCommentUrl() }
       title="Ссылка на комментарий"
       className="comment__dropdown-item">
      <i className="icon icon--hyperlink" />
      Ссылка на комментарий
    </a>

  _getCommentUrl: -> @props.entryUrl + '#comment-' + @props.commentId