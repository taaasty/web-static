FollowButton             = require '../../buttons/relationship/follow'
WriteMessageButton       = require '../../buttons/user/write_message'
HeroActions_DropdownMenu = require './dropdown_menu'
{ PropTypes } = React

#TODO: i18n
BUTTON_TITLE = 'Это вы'

module.exports = React.createClass
  displayName: 'HeroActions_User'

  propTypes:
    relationship: PropTypes.object.isRequired

  render: ->
    <div className="hero__actions">
      <FollowButton relationship={ @props.relationship } />
      <WriteMessageButton user={ @props.relationship.user } />
      <HeroActions_DropdownMenu
          userId={ @props.relationship.user.id }
          status={ @props.relationship.state } />
    </div>