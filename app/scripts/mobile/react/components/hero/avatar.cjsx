#TODO: Shared UserAvatar
UserAvatar   = require '../common/avatar/user'
FollowStatus = require '../common/followStatus/followStatus'
{ PropTypes } = React

HERO_AVATAR_SIZE = 220

module.exports = React.createClass
  displayName: 'HeroAvatar'

  propTypes:
    user:    PropTypes.object
    author:  PropTypes.object.isRequired
    status:  PropTypes.string
    onClick: PropTypes.func.isRequired

  render: ->
    <div className="hero__avatar"
         onClick={ @props.onClick }>
      { @renderFollowStatus() }
      <UserAvatar
          user={ @props.author }
          size={ HERO_AVATAR_SIZE } />
    </div>

  renderFollowStatus: ->
    unless @isCurrentUser() || !@isLogged()
      <FollowStatus
          userId={ @props.author.id }
          status={ @props.status } />

  isLogged: ->
    @props.user?

  isCurrentUser: ->
    @props.user?.id == @props.author.id