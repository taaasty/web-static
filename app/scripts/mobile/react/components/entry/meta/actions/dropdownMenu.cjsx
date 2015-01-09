DropdownMenuMixin                          = require '../../../../mixins/dropdownMenu'
EntryMetaActions_DropdownMenu_LinkItem     = require './dropdownMenu/items/link'
EntryMetaActions_DropdownMenu_EditItem     = require './dropdownMenu/items/edit'
EntryMetaActions_DropdownMenu_FavoriteItem = require './dropdownMenu/items/favorite'
EntryMetaActions_DropdownMenu_WatchItem    = require './dropdownMenu/items/watch'
EntryMetaActions_DropdownMenu_DeleteItem   = require './dropdownMenu/items/delete'
EntryMetaActions_DropdownMenu_ReportItem   = require './dropdownMenu/items/report'
{ PropTypes } = React

EntryMetaActions_DropdownMenu = React.createClass
  displayName: 'EntryMetaActions_DropdownMenu'
  mixins: [DropdownMenuMixin]

  propTypes:
    entry:   PropTypes.object.isRequired
    visible: PropTypes.bool.isRequired

  render: ->
    <div className={ @getPopupClasses('meta-actions__dropdown-popup') }>
      { @renderPopupList() }
    </div>

  renderPopupList: ->
    linkItem = <EntryMetaActions_DropdownMenu_LinkItem
                   entryUrl={ @props.entry.entry_url }
                   key="link" />

    if @props.entry.can_edit
      editItem = <EntryMetaActions_DropdownMenu_EditItem
                     editUrl={ Routes.entry_edit_url @props.entry.author.slug, @props.entry.id }
                     key="edit" />

    if @props.entry.can_favorite
      favoriteItem = <EntryMetaActions_DropdownMenu_FavoriteItem
                         entryId={ @props.entry.id }
                         favorited={ @props.entry.is_favorited }
                         key="favorite" />

    if @props.entry.can_watch
      watchItem = <EntryMetaActions_DropdownMenu_WatchItem
                      entryId={ @props.entry.id }
                      watching={ @props.entry.is_watching }
                      key="watch" />

    if @props.entry.can_report
      reportItem = <EntryMetaActions_DropdownMenu_ReportItem
                       entryId={ @props.entry.id }
                       key="report" />

    if @props.entry.can_delete
      deleteItem = <EntryMetaActions_DropdownMenu_DeleteItem
                       entryId={ @props.entry.id }
                       key="delete" />

    return <ul className="meta-actions__dropdown-popup-list">
             { [editItem, linkItem, favoriteItem, watchItem, reportItem, deleteItem] }
           </ul>

module.exports = EntryMetaActions_DropdownMenu