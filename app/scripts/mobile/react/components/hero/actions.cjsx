HeroActions_User        = require './actions/user'
HeroActions_CurrentUser = require './actions/currentUser'
{ PropTypes } = React

HeroActions = React.createClass
  displayName: 'HeroActions'

  propTypes:
    user:   PropTypes.object
    author: PropTypes.object.isRequired
    status: PropTypes.string

  render: ->
    return null unless @isLogged()

    if @isCurrentUser()
      <HeroActions_CurrentUser />
    else
      <HeroActions_User
          user={ @props.author }
          status={ @props.status } />

  isLogged: ->
    @props.user?

  isCurrentUser: ->
    @props.user?.id == @props.author.id

module.exports = HeroActions