###* @jsx React.DOM ###

Avatar = require './avatar'
{ PropTypes } = React

UserAvatar = React.createClass

  propTypes:
    user: PropTypes.object.isRequired
    size: PropTypes.number

  render: ->
    Avatar {
      name:    @props.user.name
      userpic: @props.user.userpic
      size:    @props.size
    }

module.exports = UserAvatar