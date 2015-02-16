CurrentUserStore   = require '../stores/currentUser'
ConversationStore  = require '../stores/conversation'
PageMixin          = require './mixins/page'
MessengerPageMixin = require './mixins/messenger'
FeedToolbarManager = require '../components/toolbars/feedManager'
UserToolbarManager = require '../components/toolbars/userManager'
Messenger          = require '../components/messenger/messenger'
{ PropTypes } = React

MessengerPage = React.createClass
  displayName: 'MessengerPage'
  mixins: [PageMixin, MessengerPageMixin]

  propTypes:
    currentUser:   PropTypes.object.isRequired
    conversations: PropTypes.array.isRequired

  componentWillMount: ->
    # Temporarily initialize CurrentUserStore here. Later on it will be set at
    # root App component
    # Some signin gists https://gist.github.com/ButuzGOL/707d1605f63eef55e4af
    CurrentUserStore.initialize @props.currentUser
    ConversationStore.initialize @props.conversations

  render: ->
    <div style={{ height: '100%' }}>
      <FeedToolbarManager />
      <UserToolbarManager />
      <div className="layout">
        <div className="layout__body">
          <Messenger />
        </div>
      </div>
    </div>

module.exports = MessengerPage