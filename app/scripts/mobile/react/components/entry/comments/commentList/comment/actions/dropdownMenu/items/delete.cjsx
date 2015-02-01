{ PropTypes } = React

CommentActionsDropdownMenuDeleteItem = React.createClass
  displayName: 'CommentActionsDropdownMenuDeleteItem'

  propTypes:
    commentId:       PropTypes.number.isRequired
    onCommentDelete: PropTypes.func.isRequired

  render: ->
    <li className="comment__dropdown-popup-item"
        onClick={ @handleClick }>
      <a className="comment__dropdown-popup-link">
        <i className="icon icon--basket" />
        <span>{ i18n.t('comment.delete_item') }</span>
      </a>
    </li>

  delete: ->
    @props.onCommentDelete @props.commentId

  handleClick: ->
    @delete() if confirm i18n.t 'comment.delete_confirm'

module.exports = CommentActionsDropdownMenuDeleteItem