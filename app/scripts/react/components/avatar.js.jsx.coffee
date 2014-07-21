###* @jsx React.DOM ###

window.Avatar = React.createClass
  #mixins: [ReactComponentWithPureRenderMixin]

  propTypes:
    name:     React.PropTypes.string.isRequired
    userpic:  React.PropTypes.object.isRequired
    size:     React.PropTypes.string

  getDefaultProps: ->
    size: 'thumb128' # hero(?), large, 64, 129

  render: ->
    avatar_url = @props.userpic?[@props.size+'_url']

    if avatar_url?
      avatarStyles = "background-image": "url(#{avatar_url})"

      return `<span className="avatar"
                    style={ avatarStyles }>
                <img src={ avatar_url }
                     alt={ this.props.name }
                     className="avatar__img" />
              </span>`
    else
      avatarStyles = 'background-color': @props.userpic.default_colors.background, 'color': @props.userpic.default_colors.name

      return `<span title={ this.props.name }
                    className="avatar"
                    style={ avatarStyles }>
                <span className="avatar__text">{ this.props.name.charAt(0) }</span>
              </span>`

window.UserAvatar = React.createClass

  propTypes:
    user: React.PropTypes.object.isRequired
    size: React.PropTypes.string

  render: ->
    Avatar {
      name:    @props.user.name
      userpic: @props.user.userpic
      size:    @props.size
    }