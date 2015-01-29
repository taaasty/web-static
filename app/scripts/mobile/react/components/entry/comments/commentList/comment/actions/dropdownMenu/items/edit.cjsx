{ PropTypes } = React

CommentActionsDropdownMenuEditItem = React.createClass
  displayName: 'CommentActionsDropdownMenuEditItem'

  propTypes:
    onEditStart: PropTypes.func.isRequired

  render: ->
    <li className="comment__dropdown-popup-item"
        onClick={ @props.onEditStart }>
      <a className="comment__dropdown-popup-link">
        <i className="icon icon--pencil" />
        <span>{ i18n.t('edit_comment_item') }</span>
      </a>
    </li>

module.exports = CommentActionsDropdownMenuEditItem