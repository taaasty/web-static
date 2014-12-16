HeroActions_User        = require './actions/user'
HeroActions_CurrentUser = require './actions/current_user'
{ PropTypes } = React

HeroActions = React.createClass

  propTypes:
    user:         PropTypes.object.isRequired
    relationship: PropTypes.object

  render: ->
    if @isCurrentUser()
      <HeroActions_CurrentUser />
    else
      <HeroActions_User relationship={ this.props.relationship } />

  isCurrentUser: ->
    !@props.relationship

module.exports = HeroActions