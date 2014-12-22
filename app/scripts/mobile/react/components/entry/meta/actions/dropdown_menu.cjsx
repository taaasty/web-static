EntryMetaActions_DropdownMenuLinkItem     = require './dropdown_menu/items/link'
EntryMetaActions_DropdownMenuEditItem     = require './dropdown_menu/items/edit'
EntryMetaActions_DropdownMenuFavoriteItem = require './dropdown_menu/items/favorite'
EntryMetaActions_DropdownMenuWatchItem    = require './dropdown_menu/items/watch'
EntryMetaActions_DropdownMenuDeleteItem   = require './dropdown_menu/items/delete'
EntryMetaActions_DropdownMenuReportItem   = require './dropdown_menu/items/report'
{ PropTypes } = React

module.exports = React.createClass
  displayName: 'EntryMetaActions_DropdownMenu'

  propTypes:
    entry: PropTypes.object.isRequired

  render: ->
    <div className="meta-actions__dropdown-popup">
      { @renderPopupList() }
    </div>

  renderPopupList: ->
    linkItem = <EntryMetaActions_DropdownMenuLinkItem
                   entryUrl={ @props.entry.entry_url }
                   key="link" />

    if @props.entry.can_edit
      #FIXME: Edit url
      editItem = <EntryMetaActions_DropdownMenuEditItem
                     editUrl={ @props.entry.entry_url }
                     key="edit" />

    if @props.entry.can_favorite
      favoriteItem = <EntryMetaActions_DropdownMenuFavoriteItem key="favorite" />

    if @props.entry.can_watch
      watchItem = <EntryMetaActions_DropdownMenuWatchItem key="watch" />

    if @props.entry.can_report
      reportItem = <EntryMetaActions_DropdownMenuReportItem key="report" />

    if @props.entry.can_delete
      deleteItem = <EntryMetaActions_DropdownMenuDeleteItem key="delete" />

    return <ul className="meta-actions__dropdown-popup-list">
             { [editItem, linkItem, favoriteItem, watchItem, reportItem, deleteItem] }
           </ul>