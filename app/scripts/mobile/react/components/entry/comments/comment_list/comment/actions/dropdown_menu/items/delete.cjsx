EntryViewActions = require '../../../../../../../../actions/view/entry'
{ PropTypes } = React

#TODO: i18n
LINK_TEXT       = 'Удалить комментарий'
CONFIRM_MESSAGE = 'Вы действительно хотите удалить комментарий?'

CommentActionsDropdownMenuDeleteItem = React.createClass
  displayName: 'CommentActionsDropdownMenuDeleteItem'

  propTypes:
    commentId: PropTypes.number.isRequired
    onDelete:  PropTypes.func.isRequired

  render: ->
    <li className="comment__dropdown-popup-item"
        onClick={ @handleClick }>
      <a className="comment__dropdown-popup-link"
         title={ LINK_TEXT }>
        <i className="icon icon--basket" />
        <span>{ LINK_TEXT }</span>
      </a>
    </li>

  delete: ->
    EntryViewActions.deleteComment @props.commentId
      .then @props.onDelete

  handleClick: ->
    @delete() if confirm CONFIRM_MESSAGE
    
module.exports = CommentActionsDropdownMenuDeleteItem