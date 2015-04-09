{ PropTypes } = React

EntryMetaActions_DropdownMenu_LinkItem = React.createClass
  displayName: 'EntryMetaActions_DropdownMenu_LinkItem'

  propTypes:
    entryUrl: PropTypes.string.isRequired

  render: ->
    <li className="meta-actions__dropdown-popup-item">
      <a href={ @props.entryUrl }
         className="meta-actions__dropdown-popup-link">
        <i className="icon icon--hyperlink" />
        <span>{ i18n.t('entry.link_item') }</span>
      </a>
    </li>

module.exports = EntryMetaActions_DropdownMenu_LinkItem