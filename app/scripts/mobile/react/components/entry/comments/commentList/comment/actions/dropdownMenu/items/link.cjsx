i18n = require 'i18next'
{ PropTypes } = React

LINK_TEXT = -> i18n.t 'link_comment_item'

CommentActionsDropdownMenuLinkItem = React.createClass
  displayName: 'CommentActionsDropdownMenuLinkItem'

  propTypes:
    entryUrl:  PropTypes.string.isRequired
    commentId: PropTypes.number.isRequired

  render: ->
    <li className="comment__dropdown-popup-item">
      <a className="comment__dropdown-popup-link"
         title={ LINK_TEXT() }
         href={ @getCommentUrl() }>
        <i className="icon icon--hyperlink" />
        <span>{ LINK_TEXT() }</span>
      </a>
    </li>

  getCommentUrl: ->
    @props.entryUrl + '#comment-' + @props.commentId

module.exports = CommentActionsDropdownMenuLinkItem