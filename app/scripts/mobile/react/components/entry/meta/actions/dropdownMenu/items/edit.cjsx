i18n = require 'i18next'
{ PropTypes } = React

TITLE = -> i18n.t 'edit_entry_item'

EntryMetaActions_DropdownMenu_EditItem = React.createClass
  displayName: 'EntryMetaActions_DropdownMenu_EditItem'

  propTypes:
    editUrl: PropTypes.string.isRequired

  render: ->
    <li className="meta-actions__dropdown-popup-item">
      <a href={ @props.editUrl }
         className="meta-actions__dropdown-popup-link">
        <i className="icon icon--pencil" />
        <span>{ TITLE() }</span>
      </a>
    </li>

module.exports = EntryMetaActions_DropdownMenu_EditItem