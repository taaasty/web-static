{ PropTypes } = React

#TODO: i18n
LINK_TEXT = 'Удалить комментарий'

CommentActionsDropdownMenuDeleteItem = React.createClass
  displayName: 'CommentActionsDropdownMenuDeleteItem'

  propTypes:
    commentId: PropTypes.number.isRequired

  render: ->
    <li className="comment__dropdown-popup-item">
      <a className="comment__dropdown-popup-link"
         title={ LINK_TEXT }>
        <i className="icon icon--basket" />
        <span>{ LINK_TEXT }</span>
      </a>
    </li>

module.exports = CommentActionsDropdownMenuDeleteItem