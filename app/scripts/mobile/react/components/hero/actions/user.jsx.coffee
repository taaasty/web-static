###* @jsx React.DOM ###

FollowButton             = require '../../buttons/relationship/follow'
WriteMessageButton       = require '../../buttons/user/write_message'
HeroActions_DropdownMenu = require './dropdown_menu'
{ PropTypes } = React

#TODO: i18n
BUTTON_TITLE = 'Это вы'

HeroActions_User = React.createClass

  propTypes:
    relationship: PropTypes.object.isRequired

  render: ->
   `<div className="hero__actions">
      <FollowButton relationship={ this.props.relationship } />
      <WriteMessageButton user={ this.props.relationship.user } />
      <HeroActions_DropdownMenu
          userId={ this.props.relationship.user.id }
          status={ this.props.relationship.state } />
    </div>`

module.exports = HeroActions_User