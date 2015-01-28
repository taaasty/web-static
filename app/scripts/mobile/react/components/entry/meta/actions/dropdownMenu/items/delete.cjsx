EntryViewActions = require '../../../../../../actions/view/entry'
{ PropTypes } = React

TITLE           = -> t 'delete_entry_item'
CONFIRM_MESSAGE = -> t 'delete_entry_confirm'

EntryMetaActions_DropdownMenu_DeleteItem = React.createClass
  displayName: 'EntryMetaActions_DropdownMenu_DeleteItem'

  propTypes:
    entryId: PropTypes.number.isRequired

  render: ->
    <li className="meta-actions__dropdown-popup-item">
      <a className="meta-actions__dropdown-popup-link"
         onClick={ @handleClick }>
        <i className="icon icon--basket" />
        <span>{ TITLE() }</span>
      </a>
    </li>

  delete: ->
    #TODO: Redirect after success delete
    EntryViewActions.delete @props.entryId

  handleClick: ->
    @delete() if confirm CONFIRM_MESSAGE()

module.exports = EntryMetaActions_DropdownMenu_DeleteItem