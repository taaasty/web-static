###* @jsx React.DOM ###

AVATAR_STYLES = [ 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth' ]

module.experts = window.Avatar = React.createClass
  propTypes:
    user:       React.PropTypes.object
    userCortex: React.PropTypes.instanceOf(Cortex)
    size:       React.PropTypes.string

  getDefaultProps: ->
    size: 'thumb128' # large, thumb16, 32, 64, 127, touch

  getInitialState: ->
    userCortex: @props.userCortex

  componentDidMount: ->
    @state.userCortex?.on 'update', @_updateUserCortex

  componentWillUnmount: ->
    @state.userCortex?.off 'update', @_updateUserCortex

  _updateUserCortex: (userCortex) ->
    @setState userCortex: userCortex

  firstChar: ->
    if @state.userCortex?
      @state.userCortex.name.val()[0]
    else
      @props.user.name[0]

  number: ->
    @firstChar().charCodeAt(0) % AVATAR_STYLES.length

  style: ->
    AVATAR_STYLES[@number()]

  image_url: ->
    key = @props.size+'_url'
    if @state.userCortex?
      @state.userCortex.userpic?[key]?.val()
    else
      @props.user.userpic[key]

  render: ->
    name = @state.userCortex?.name.val() || @props.user.name

    if @image_url()?
      style = "background-image": "url(#{@image_url()})"
      return `<span className="avatar" style={style}><img alt={name} className="avatar__img" src={this.image_url()} /></span>`
    else
      avatarClass = 'avatar ' + 'avatar--' + @style()
      return `<span className={avatarClass}><span className="avatar__text">{this.firstChar()}</span></span>`
