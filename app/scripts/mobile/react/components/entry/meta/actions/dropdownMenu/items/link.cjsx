i18n = require 'i18next'
{ PropTypes } = React

TITLE = -> i18n.t 'link_entry_item'

EntryMetaActions_DropdownMenu_LinkItem = React.createClass
  displayName: 'EntryMetaActions_DropdownMenu_LinkItem'

  propTypes:
    entryUrl: PropTypes.string.isRequired

  render: ->
    <li className="meta-actions__dropdown-popup-item">
      <a href={ @props.entryUrl }
         className="meta-actions__dropdown-popup-link">
        <i className="icon icon--hyperlink" />
        <span>{ TITLE() }</span>
      </a>
    </li>

module.exports = EntryMetaActions_DropdownMenu_LinkItem