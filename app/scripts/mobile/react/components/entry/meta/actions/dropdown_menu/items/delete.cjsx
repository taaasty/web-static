EntryViewActions = require '../../../../../../actions/view/entry'
{ PropTypes } = React

#TODO: i18n
TITLE           = 'Удалить'
CONFIRM_MESSAGE = 'Вы действительно хотите удалить запись?\nЕё нельзя будет восстановить.'

module.exports = React.createClass
  displayName: 'EntryMetaActions_DropdownMenuDeleteItem'

  propTypes:
    entryId: PropTypes.number.isRequired

  render: ->
    <li className="meta-actions__dropdown-popup-item">
      <a className="meta-actions__dropdown-popup-link"
         onClick={ @handleClick }>
        <i className="icon icon--basket" />
        <span>{ TITLE }</span>
      </a>
    </li>

  delete: ->
    #TODO: Redirect after success delete
    EntryViewActions.delete @props.entryId

  handleClick: (e) ->
    e.preventDefault()
    e.stopPropagation()
    @delete() if confirm CONFIRM_MESSAGE