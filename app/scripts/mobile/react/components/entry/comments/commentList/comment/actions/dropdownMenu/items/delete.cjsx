i18n = require 'i18next'
{ PropTypes } = React

LINK_TEXT       = -> i18n.t 'delete_comment_item'
CONFIRM_MESSAGE = -> i18n.t 'delete_comment_confirm'

CommentActionsDropdownMenuDeleteItem = React.createClass
  displayName: 'CommentActionsDropdownMenuDeleteItem'

  propTypes:
    commentId:       PropTypes.number.isRequired
    onCommentDelete: PropTypes.func.isRequired

  render: ->
    <li className="comment__dropdown-popup-item"
        onClick={ @handleClick }>
      <a className="comment__dropdown-popup-link"
         title={ LINK_TEXT() }>
        <i className="icon icon--basket" />
        <span>{ LINK_TEXT() }</span>
      </a>
    </li>

  delete: ->
    @props.onCommentDelete @props.commentId

  handleClick: ->
    @delete() if confirm CONFIRM_MESSAGE()
    
module.exports = CommentActionsDropdownMenuDeleteItem