TITLE = 'Удалить'

module.exports = React.createClass
  displayName: 'EntryMetaActions_DropdownMenuDeleteItem'

  render: ->
    <li className="meta-actions__dropdown-popup-item"
        onClick={ @delete }>
      <a href="#"
         className="meta-actions__dropdown-popup-link">
        <i className="icon icon--basket" />
        <span>{ TITLE }</span>
      </a>
    </li>

  delete: (e) ->
    e.preventDefault()
    console.log 'delete'