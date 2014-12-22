#TODO: Shared UserAvatar
UserAvatar   = require '../common/avatar/user'
FollowStatus = require '../common/follow_status/follow_status'
{ PropTypes } = React

HERO_AVATAR_SIZE = 220

module.exports = React.createClass
  displayName: 'HeroAvatar'

  propTypes:
    user:    PropTypes.object.isRequired
    status:  PropTypes.string.isRequired
    onClick: PropTypes.func.isRequired

  render: ->
    <div className="hero__avatar"
         onClick={ @props.onClick }>
      { @renderFollowStatus() }
      <UserAvatar
          user={ @props.user }
          size={ HERO_AVATAR_SIZE } />
    </div>

  renderFollowStatus: ->
    if !@isCurrentUser()
      <FollowStatus
          userId={ @props.user.id }
          status={ @props.status } />

  isCurrentUser: ->
    !@props.status