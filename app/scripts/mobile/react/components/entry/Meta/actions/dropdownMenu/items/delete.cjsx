EntryViewActions = require '../../../../../../actions/view/entry'
{ PropTypes } = React

EntryMetaActions_DropdownMenu_DeleteItem = React.createClass
  displayName: 'EntryMetaActions_DropdownMenu_DeleteItem'

  propTypes:
    entryId: PropTypes.number.isRequired
    onDelete: PropTypes.func

  render: ->
    <li className="meta-actions__dropdown-popup-item">
      <a className="meta-actions__dropdown-popup-link"
         onClick={ @handleClick }>
        <i className="icon icon--basket" />
        <span>{ i18n.t('entry.delete_item') }</span>
      </a>
    </li>

  delete: ->
    EntryViewActions.delete @props.entryId
      .then onDelete

  handleClick: ->
    @delete() if confirm i18n.t 'entry.delete_confirm'

module.exports = EntryMetaActions_DropdownMenu_DeleteItem
