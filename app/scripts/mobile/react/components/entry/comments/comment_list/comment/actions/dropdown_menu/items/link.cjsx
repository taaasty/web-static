{ PropTypes } = React

#TODO: i18n
LINK_TEXT = 'Ссылка на комментарий'

CommentActionsDropdownMenuLinkItem = React.createClass
  displayName: 'CommentActionsDropdownMenuLinkItem'

  propTypes:
    entryUrl:  PropTypes.string.isRequired
    commentId: PropTypes.number.isRequired

  render: ->
    <li className="comment__dropdown-popup-item">
      <a className="comment__dropdown-popup-link"
         title={ LINK_TEXT }
         href={ @getCommentUrl() }>
        <i className="icon icon--hyperlink" />
        <span>{ LINK_TEXT }</span>
      </a>
    </li>

  getCommentUrl: ->
    @props.entryUrl + '#comment-' + @props.commentId

module.exports = CommentActionsDropdownMenuLinkItem