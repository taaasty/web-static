{ PropTypes } = React

TITLE = 'Редактировать'

module.exports = React.createClass
  displayName: 'EntryMetaActions_DropdownMenuEditItem'

  propTypes:
    editUrl: PropTypes.string.isRequired

  render: ->
    <li className="meta-actions__dropdown-popup-item">
      <a href={ @props.editUrl }
         className="meta-actions__dropdown-popup-link">
        <i className="icon icon--pencil" />
        <span>{ TITLE }</span>
      </a>
    </li>