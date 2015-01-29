{ PropTypes } = React

CommentActionsDropdownMenuLinkItem = React.createClass
  displayName: 'CommentActionsDropdownMenuLinkItem'

  propTypes:
    entryUrl:  PropTypes.string.isRequired
    commentId: PropTypes.number.isRequired

  render: ->
    <li className="comment__dropdown-popup-item">
      <a className="comment__dropdown-popup-link"
         href={ @getCommentUrl() }>
        <i className="icon icon--hyperlink" />
        <span>{ i18n.t('link_comment_item') }</span>
      </a>
    </li>

  getCommentUrl: ->
    @props.entryUrl + '#comment-' + @props.commentId

module.exports = CommentActionsDropdownMenuLinkItem