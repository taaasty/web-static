FollowButton                   = require '../../../buttons/relationship/follow'
HeroActions_WriteMessageButton = require './buttons/writeMessage'
HeroActions_DropdownMenu       = require './dropdownMenu'
{ PropTypes } = React

#TODO: i18n
BUTTON_TITLE = 'Это вы'

HeroActions_User = React.createClass
  displayName: 'HeroActions_User'

  propTypes:
    user:   PropTypes.object.isRequired
    status: PropTypes.string.isRequired

  render: ->
    <div className="hero__actions">
      <FollowButton
          user={ @props.user }
          status={ @props.status } />
      <HeroActions_WriteMessageButton user={ @props.user } />
      <HeroActions_DropdownMenu
          userId={ @props.user.id }
          status={ @props.status } />
    </div>

module.exports = HeroActions_User