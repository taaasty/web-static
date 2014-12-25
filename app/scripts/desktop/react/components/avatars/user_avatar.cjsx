window.UserAvatar = React.createClass
  displayName: 'UserAvatar'

  propTypes:
    user: React.PropTypes.object.isRequired
    size: React.PropTypes.number

  getInitialState: ->
    user: @props.user

  componentDidMount: ->
    TastyEvents.on TastyEvents.keys.user_property_changed( 'avatar', @props.user.id ), @_updateUserpic

  componentWillUnmount: ->
    TastyEvents.off TastyEvents.keys.user_property_changed( 'avatar', @props.user.id ), @_updateUserpic

  render: ->
    <Avatar
        name={ @state.user.name }
        userpic={ @state.user.userpic }
        size={ @props.size } />

  _updateUserpic: (userpic) ->
    newUser = @state.user
    newUser.userpic = userpic

    @setState(user: newUser)