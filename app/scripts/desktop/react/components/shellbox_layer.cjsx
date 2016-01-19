window.ShellBox = React.createClass
  mixins: [ReactUnmountMixin]

  getDefaultProps: ->
    fadeSpeed: 1000

  getInitialState: ->
    isDisabled: false

  handleClick: (e) ->
    unless @state.isDisabled
      if $(e.target).hasClass('shellbox__cell')
        e.preventDefault()
        @unmount()

  componentWillMount: ->
    @blurScreen()
    # При фокусе на инпуте, тачдевайсы триггерят скролл, и форма будет закрываться
    # не давая авторизоваться
    # window.addEventListener 'scroll', @unmount
    Mousetrap.bind 'esc', @onClose

  componentDidMount: ->
    #$(@getDOMNode()).fadeIn @props.fadeSpeed
    #$(@getDOMNode()).addClass 'enter-active'

  componentWillUnmount: ->
    @unblurScreen()
    # window.removeEventListener 'scroll', @unmount
    Mousetrap.unbind 'esc', @onClose

  render: ->
    children = React.Children.map @props.children, (child) =>
      React.cloneElement child, {
        disableShellbox: @disableShellbox
        enableShellbox: @enableShellbox
      }

    return <div className="shellbox">
             <div className="shellbox__main">
               <div className="shellbox__cell" onClick={ this.handleClick }>
                 {children}
               </div>
             </div>
           </div>

  blurScreen: ->
    # TODO Можно ли как-то избавиться от класса в html?
    # см http://facebook.github.io/react/docs/animation.html
    $('html').addClass 'shellbox-enabled'

  unblurScreen: ->
    $('html').removeClass 'shellbox-enabled'

  onClose: -> @unmount() unless @state.isDisabled

  disableShellbox: -> @setState isDisabled: true
  enableShellbox:  -> @setState isDisabled: false