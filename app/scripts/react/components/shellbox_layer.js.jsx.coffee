###* @jsx React.DOM ###

module.experts = window.ShellBox = React.createClass
  mixins: [ReactUnmountMixin]

  getDefaultProps: ->
    fadeSpeed: 1000

  handleClick: (e) ->
    if $(e.target).hasClass('shellbox__cell')
      e.preventDefault()
      @unmount()

  #unmount: ->
    #ReactApp.shellbox.close()

  componentWillMount: ->
    @blurScreen()
    # При фокусе на инпуте, тачдевайсы триггерят скролл, и форма будет закрываться
    # не давая авторизоваться
    # window.addEventListener 'scroll', @unmount
    Mousetrap.bind 'esc', @unmount

  componentDidMount: ->
    #$(@getDOMNode()).fadeIn @props.fadeSpeed
    #$(@getDOMNode()).addClass 'enter-active'

  componentWillUnmount: ->
    @unblurScreen()
    # window.removeEventListener 'scroll', @unmount
    Mousetrap.unbind 'esc', @unmount

  render: ->
    return `<div className="shellbox">
            <div className="shellbox__main">
            <div className="shellbox__cell" onClick={this.handleClick}>
            {this.props.children}
            </div></div></div>`

  blurScreen: ->
    # TODO Можно ли как-то избавиться от класса в html?
    # см http://facebook.github.io/react/docs/animation.html
    $('html').addClass 'shellbox-enabled'

  unblurScreen: ->
    $('html').removeClass 'shellbox-enabled'


