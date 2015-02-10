CurrentUserStore   = require '../stores/currentUser'
PageMixin          = require './mixins/page'
FeedToolbarManager = require '../components/toolbars/feedManager'
UserToolbarManager = require '../components/toolbars/userManager'
Settings           = require '../components/settings/settings'
{ PropTypes } = React

SettingsPage = React.createClass
  displayName: 'SettingsPage'
  mixins: [PageMixin]

  propTypes:
    currentUser: PropTypes.object.isRequired

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
          <Settings />
        </div>
      </div>
    </div>

module.exports = SettingsPage