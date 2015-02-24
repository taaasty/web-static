UserAvatar = require '../../../../common/avatar/user'
{ PropTypes } = React

MessengerChooserListItem = React.createClass

  propTypes:
    item:     PropTypes.object.isRequired
    onSelect: PropTypes.func.isRequired

  render: ->
    <li className="messages__chooser-result"
        onClick={ @handleClick }>
      <div className="messages__person">
        <div className="messages__person-avatar">
          <UserAvatar
              user={ @props.item }
              size={ 42 } />
        </div>
        <div className="messages__person-name">
          { @props.item.name }
        </div>
      </div>
    </li>

  handleClick: ->
    @props.onSelect @props.item.id

module.exports = MessengerChooserListItem