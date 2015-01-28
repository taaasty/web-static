FollowButton                       = require '../../../buttons/relationship/follow'
HeroTlogActions_WriteMessageButton = require './buttons/writeMessage'
HeroTlogActions_DropdownMenu       = require './dropdownMenu'
{ PropTypes } = React

HeroTlogActions_User = React.createClass
  displayName: 'HeroTlogActions_User'

  propTypes:
    user:   PropTypes.object.isRequired
    status: PropTypes.string.isRequired

  render: ->
    <div className="hero__actions">
      <FollowButton
          user={ @props.user }
          status={ @props.status } />
      <HeroTlogActions_WriteMessageButton user={ @props.user } />
      <HeroTlogActions_DropdownMenu
          userId={ @props.user.id }
          status={ @props.status } />
    </div>

module.exports = HeroTlogActions_User