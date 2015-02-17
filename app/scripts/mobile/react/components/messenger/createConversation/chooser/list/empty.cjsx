MessengerChooserListEmpty = React.createClass
  displayName: 'MessengerChooserListEmpty'

  render: ->
    <div className="messages__chooser-dropdown">
      <div className="messages__chooser-empty">
        Список пуст
      </div>
    </div>

module.exports = MessengerChooserListEmpty