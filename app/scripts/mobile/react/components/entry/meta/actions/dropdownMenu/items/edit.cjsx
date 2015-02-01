{ PropTypes } = React

EntryMetaActions_DropdownMenu_EditItem = React.createClass
  displayName: 'EntryMetaActions_DropdownMenu_EditItem'

  propTypes:
    editUrl: PropTypes.string.isRequired

  render: ->
    <li className="meta-actions__dropdown-popup-item">
      <a href={ @props.editUrl }
         className="meta-actions__dropdown-popup-link">
        <i className="icon icon--pencil" />
        <span>{ i18n.t('entry.edit_item') }</span>
      </a>
    </li>

module.exports = EntryMetaActions_DropdownMenu_EditItem