###* @jsx React.DOM ###

module.experts = window.Avatar = React.createClass
  #mixins: [ReactComponentWithPureRenderMixin]
  propTypes:
    name:    React.PropTypes.string.isRequired
    userpic: React.PropTypes.object.isRequired
    size:    React.PropTypes.string

  getDefaultProps: ->
    size: 'thumb128' # hero(?), large, 64, 129

  render: ->
    avatar_url = @props.userpic?[@props.size+'_url']

    if avatar_url?
      bg_style = "background-image": "url(#{avatar_url})"
      return `<span className="avatar" style={bg_style}><img alt={this.props.name} className="avatar__img" src={avatar_url} /></span>`
    else
      style = 'background-color': @props.userpic.background, 'color': @props.userpic.name
      return `<span className='avatar' style={style} title={this.props.name}><span className="avatar__text">{this.props.name.charAt(0)}</span></span>`
