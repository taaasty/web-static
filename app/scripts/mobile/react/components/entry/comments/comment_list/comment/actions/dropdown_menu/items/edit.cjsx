{ PropTypes } = React

#TODO: i18n
LINK_TEXT = 'Редактировать комментарий'

CommentActionsDropdownMenuEditItem = React.createClass
  displayName: 'CommentActionsDropdownMenuEditItem'

  propTypes:
    onEditStart: PropTypes.func.isRequired

  render: ->
    <li className="comment__dropdown-popup-item"
        onClick={ @props.onEditStart }>
      <a className="comment__dropdown-popup-link"
         title={ LINK_TEXT }>
        <i className="icon icon--pencil" />
        <span>{ LINK_TEXT }</span>
      </a>
    </li>

module.exports = CommentActionsDropdownMenuEditItem