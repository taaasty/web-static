DropdownMenuMixin                    = require '../../../../../../mixins/dropdownMenu'
CommentActionsDropdownMenuLinkItem   = require './dropdownMenu/items/link'
CommentActionsDropdownMenuEditItem   = require './dropdownMenu/items/edit'
CommentActionsDropdownMenuDeleteItem = require './dropdownMenu/items/delete'
CommentActionsDropdownMenuReportItem = require './dropdownMenu/items/report'
{ PropTypes } = React

CommentActionsDropdownMenu = React.createClass
  displayName: 'CommentActionsDropdownMenu'
  mixins: [DropdownMenuMixin]

  propTypes:
    entry:           PropTypes.object.isRequired
    comment:         PropTypes.object.isRequired
    onEditStart:     PropTypes.func.isRequired
    onCommentDelete: PropTypes.func.isRequired
    onCommentReport: PropTypes.func.isRequired

  render: ->
    <div className={ @getPopupClasses('comment__dropdown-popup') }>
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
                       onCommentReport={ @props.onCommentReport }
                       key="report" />

    if @props.comment.can_edit
      editItem = <CommentActionsDropdownMenuEditItem
                     onEditStart={ @props.onEditStart }
                     key="edit" />

    if @props.comment.can_delete
      deleteItem = <CommentActionsDropdownMenuDeleteItem
                       commentId={ @props.comment.id }
                       onCommentDelete={ @props.onCommentDelete }
                       key="delete" />

    return <ul className="comment__dropdown-popup-list">
             { [editItem, linkItem, reportItem, deleteItem] }
           </ul>

module.exports = CommentActionsDropdownMenu