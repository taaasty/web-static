CurrentUserStore         = require '../stores/currentUser'
ConversationStore        = require '../stores/conversation'
MessageStore             = require '../stores/message'
PageMixin                = require './mixins/page'
MessengerThreadPageMixin = require './mixins/messengerThread'
FeedToolbarManager       = require '../components/toolbars/feedManager'
UserToolbarManager       = require '../components/toolbars/userManager'
Messenger                = require '../components/messenger/messenger'
{ PropTypes } = React

MessengerThreadPage = React.createClass
  displayName: 'MessengerThreadPage'
  mixins: [PageMixin, MessengerThreadPageMixin]

  propTypes:
    currentUser:  PropTypes.object.isRequired
    conversation: PropTypes.object.isRequired
    messages:     PropTypes.array.isRequired

  componentWillMount: ->
    # Temporarily initialize CurrentUserStore here. Later on it will be set at
    # root App component
    # Some signin gists https://gist.github.com/ButuzGOL/707d1605f63eef55e4af
    CurrentUserStore.initialize @props.currentUser
    ConversationStore.initSingular @props.conversation
    MessageStore.initialize @props.messages

  render: ->
    <div>
      <FeedToolbarManager />
      <UserToolbarManager />
      <div className="layout">
        <div className="layout__body">
          <Messenger state="conversation" />
        </div>
      </div>
    </div>

module.exports = MessengerThreadPage