cx = require 'react/lib/cx'
{ PropTypes } = React

module.exports = React.createClass
  displayName: 'Avatar'

  propTypes:
    name:    PropTypes.string.isRequired
    userpic: PropTypes.object.isRequired
    size:    PropTypes.number

  # Известные размеры:
  # - settings: 110
  # - comment:  35
  # - hero:     220
  # - brick:    35

  getDefaultProps: ->
    size: 220 # Этого размера картинки хватает на все аватары

  render: ->
    avatarUrl     = @props.userpic.original_url || @props.userpic.large_url
    avatarSymbol  = @props.userpic.symbol
    avatarClasses = cx
      'avatar': true
      'anonymous_char': @isAnonymous()

    if avatarUrl?
      avatarUrl    = ThumborService.image_url avatarUrl, @props.size + 'x' + @props.size
      avatarStyles = backgroundImage: "url(#{ avatarUrl })"

      return <span style={ avatarStyles }
                   className={ avatarClasses }>
               <img src={ avatarUrl }
                    alt={ @props.name }
                    className="avatar__img" />
             </span>
    else
      avatarStyles =
        backgroundColor: @props.userpic.default_colors.background
        color:           @props.userpic.default_colors.name

      return <span style={ avatarStyles }
                   className={ avatarClasses }
                   title={ @props.name }>
               <span className="avatar__text">
                 { avatarSymbol }
               </span>
             </span>

  isAnonymous: -> @props.userpic.kind is 'anonymous'
  isUser:      -> @props.userpic.kind is 'user'