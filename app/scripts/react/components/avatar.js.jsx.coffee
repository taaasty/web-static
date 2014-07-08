###* @jsx React.DOM ###

AVATAR_TYPES = [ 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth' ]

module.experts = window.Avatar = React.createClass
  #mixins: [ReactComponentWithPureRenderMixin]
  propTypes:
    name:    React.PropTypes.string.isRequired
    userpic: React.PropTypes.object.isRequired
    size:    React.PropTypes.string

  getDefaultProps: ->
    size: 'thumb128' # large, thumb16, 32, 64, 127, touch

  render: ->
    avatar_url = @props.userpic?[@props.size+'_url']

    if avatar_url?
      bg_style = "background-image": "url(#{avatar_url})"
      return `<span className="avatar" style={bg_style}><img alt={this.props.name} className="avatar__img" src={avatar_url} /></span>`
    else
      avatarClass = 'avatar ' + 'avatar--' + @getType()
      return `<span className={avatarClass}><span className="avatar__text">{this.props.name.charAt(0)}</span></span>`

  getType: ->
    number =  @props.name.charCodeAt(0) % AVATAR_TYPES.length
    AVATAR_TYPES[number]

