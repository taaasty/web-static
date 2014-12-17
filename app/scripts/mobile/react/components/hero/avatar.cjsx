#TODO: Shared UserAvatar
UserAvatar   = require '../common/avatar/user'
FollowStatus = require '../common/follow_status/follow_status'
{ PropTypes } = React

HERO_AVATAR_SIZE = 220

module.exports = React.createClass
  displayName: 'HeroAvatar'

  propTypes:
    user:         PropTypes.object.isRequired
    relationship: PropTypes.object
    onClick:      PropTypes.func.isRequired

  render: ->
    <div className="hero__avatar"
         onClick={ this.props.onClick }>
      { this.renderFollowStatus() }
      <UserAvatar
          user={ this.props.user }
          size={ HERO_AVATAR_SIZE } />
    </div>

  renderFollowStatus: ->
    if !@isCurrentUser()
      <FollowStatus
          tlogId={ this.props.user.id }
          status={ this.props.relationship.state } />

  isCurrentUser: ->
    !@props.relationship