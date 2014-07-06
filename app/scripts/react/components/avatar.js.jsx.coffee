###* @jsx React.DOM ###

AVATAR_TYPES = [ 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth' ]

module.experts = window.Avatar = React.createClass
  propTypes:
    user:       React.PropTypes.object
    userCortex: React.PropTypes.instanceOf(Cortex)
    size:       React.PropTypes.string

  getDefaultProps: ->
    size: 'thumb128' # large, thumb16, 32, 64, 127, touch

  getInitialState: ->
    if @props.userCortex?
      @getStateFromCortex @props.userCortex
    else
      @getStateFromUser @props.user

  componentDidMount:    -> @props.userCortex?.on 'update', @_updateUserCortex
  componentWillUnmount: -> @props.userCortex?.off 'update', @_updateUserCortex

  _updateUserCortex: (userCortex) ->
    @setState @getStateFromCortex userCortex

  render: ->
    console.debug 'render avatar', @state.name

    if @state.avatar_url?
      bg_style = "background-image": "url(#{this.state.avatar_url})"
      return `<span className="avatar" style={bg_style}><img alt={this.state.name} className="avatar__img" src={this.state.avatar_url} /></span>`
    else
      avatarClass = 'avatar ' + 'avatar--' + @getType()
      return `<span className={avatarClass}><span className="avatar__text">{this.state.name.charAt(0)}</span></span>`

  getStateFromUser: (user) ->
    key = @props.size+'_url'
    return avatar_url: user.userpic?[key], name: user.name

  getStateFromCortex: (userCortex) ->
    key = @props.size+'_url'
    return avatar_url: userCortex.userpic?[key]?.val(), name: userCortex.name.val()

  getType: ->
    number =  @state.name.charCodeAt(0) % AVATAR_TYPES.length
    AVATAR_TYPES[number]

