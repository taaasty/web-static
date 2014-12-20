HeroActions_User        = require './actions/user'
HeroActions_CurrentUser = require './actions/current_user'
{ PropTypes } = React

module.exports = React.createClass
  displayName: 'HeroActions'

  propTypes:
    user:   PropTypes.object.isRequired
    status: PropTypes.string.isRequired

  render: ->
    if @isCurrentUser()
      <HeroActions_CurrentUser />
    else
      <HeroActions_User
          user={ @props.user }
          status={ @props.status } />

  isCurrentUser: ->
    !@props.status