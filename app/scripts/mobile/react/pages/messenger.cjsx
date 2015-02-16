CurrentUserStore   = require '../stores/currentUser'
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

  render: ->
    <div>
      <FeedToolbarManager />
      <UserToolbarManager />
      <div className="layout">
        <div className="layout__body">
          <Messenger conversations={ @props.conversations } />
        </div>
      </div>
    </div>

module.exports = MessengerPage