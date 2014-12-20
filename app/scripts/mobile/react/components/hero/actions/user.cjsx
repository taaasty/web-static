FollowButton             = require '../../buttons/relationship/follow'
WriteMessageButton       = require '../../buttons/user/write_message'
HeroActions_DropdownMenu = require './dropdown_menu'
{ PropTypes } = React

#TODO: i18n
BUTTON_TITLE = 'Это вы'

module.exports = React.createClass
  displayName: 'HeroActions_User'

  propTypes:
    user:   PropTypes.object.isRequired
    status: PropTypes.string.isRequired

  render: ->
    <div className="hero__actions">
      <FollowButton
          user={ @props.user }
          status={ @props.status } />
      <WriteMessageButton user={ @props.user } />
      <HeroActions_DropdownMenu
          userId={ @props.user.id }
          status={ @props.status } />
    </div>