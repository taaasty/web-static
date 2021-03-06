Avatar = require './avatar'
{ PropTypes } = React

UserAvatar = React.createClass
  displayName: 'UserAvatar'

  propTypes:
    user: PropTypes.object.isRequired
    size: PropTypes.number

  render: ->
    <Avatar name={ @props.user.name }
            userpic={ @props.user.userpic }
            size={ @props.size } />

module.exports = UserAvatar