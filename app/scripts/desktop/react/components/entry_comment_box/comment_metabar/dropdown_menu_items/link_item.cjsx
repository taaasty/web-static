window.EntryCommentBox_CommentMetaBarDropdownMenuLinkItem = React.createClass

  propTypes:
    commentId: React.PropTypes.number.isRequired

  render: ->
    <a href={ this._getCommentUrl() }
       title={ i18n.t('link_comment_item') }
       className="comment__dropdown-item">
      <i className="icon icon--hyperlink" />
      { i18n.t('link_comment_item') }
    </a>

  _getCommentUrl: -> @props.entryUrl + '#comment-' + @props.commentId