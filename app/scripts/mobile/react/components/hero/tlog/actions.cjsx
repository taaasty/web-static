HeroTlogActions_User        = require './actions/user'
HeroTlogActions_CurrentUser = require './actions/currentUser'
{ PropTypes } = React

HeroTlogActions = React.createClass
  displayName: 'HeroTlogActions'

  propTypes:
    user:   PropTypes.object
    author: PropTypes.object.isRequired
    status: PropTypes.string

  render: ->
    return null unless @isLogged()

    if @isCurrentUser()
      <HeroTlogActions_CurrentUser user={ @props.user } />
    else
      <HeroTlogActions_User
          user={ @props.author }
          status={ @props.status } />

  isLogged: ->
    @props.user?

  isCurrentUser: ->
    @props.user?.id == @props.author.id

module.exports = HeroTlogActions