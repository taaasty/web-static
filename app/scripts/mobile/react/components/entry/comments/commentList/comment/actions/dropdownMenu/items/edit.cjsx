{ PropTypes } = React

LINK_TEXT = -> t 'edit_comment_item'

CommentActionsDropdownMenuEditItem = React.createClass
  displayName: 'CommentActionsDropdownMenuEditItem'

  propTypes:
    onEditStart: PropTypes.func.isRequired

  render: ->
    <li className="comment__dropdown-popup-item"
        onClick={ @props.onEditStart }>
      <a className="comment__dropdown-popup-link"
         title={ LINK_TEXT() }>
        <i className="icon icon--pencil" />
        <span>{ LINK_TEXT() }</span>
      </a>
    </li>

module.exports = CommentActionsDropdownMenuEditItem