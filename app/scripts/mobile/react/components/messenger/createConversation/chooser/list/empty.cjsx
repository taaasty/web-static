MessengerChooserListEmpty = React.createClass
  displayName: 'MessengerChooserListEmpty'

  render: ->
    <div className="messages__chooser-dropdown">
      <div className="messages__chooser-empty">
        { i18n.t('messenger.recipients_empty_list') }
      </div>
    </div>

module.exports = MessengerChooserListEmpty