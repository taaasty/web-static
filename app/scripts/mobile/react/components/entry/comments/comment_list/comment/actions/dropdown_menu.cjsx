CommentActionsDropdownMenuLinkItem   = require './dropdown_menu/items/link'
CommentActionsDropdownMenuEditItem   = require './dropdown_menu/items/edit'
CommentActionsDropdownMenuDeleteItem = require './dropdown_menu/items/delete'
CommentActionsDropdownMenuReportItem = require './dropdown_menu/items/report'
{ PropTypes } = React

CommentActionsDropdownMenu = React.createClass
  displayName: 'CommentActionsDropdownMenu'

  propTypes:
    entry:       PropTypes.object.isRequired
    comment:     PropTypes.object.isRequired
    onDelete:    PropTypes.func.isRequired
    onEditStart: PropTypes.func.isRequired

  render: ->
    <div className="comment__dropdown-popup">
      { @renderPopupList() }
    </div>

  renderPopupList: ->
    linkItem = <CommentActionsDropdownMenuLinkItem
                   commentId={ @props.comment.id }
                   entryUrl={ @props.entry.entry_url }
                   key="link" />

    if @props.comment.can_report
      reportItem = <CommentActionsDropdownMenuReportItem
                       commentId={ @props.comment.id }
                       key="report" />

    if @props.comment.can_edit
      editItem = <CommentActionsDropdownMenuEditItem
                     onEditStart={ @props.onEditStart }
                     key="edit" />

    if @props.comment.can_delete
      deleteItem = <CommentActionsDropdownMenuDeleteItem
                       commentId={ @props.comment.id }
                       onDelete={ @props.onDelete }
                       key="delete" />

    return <ul className="comment__dropdown-popup-list">
             { [editItem, linkItem, reportItem, deleteItem] }
           </ul>

module.exports = CommentActionsDropdownMenu