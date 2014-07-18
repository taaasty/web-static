###* @jsx React.DOM ###

window.Popup = React.createClass
  mixins: [ReactUnmountMixin]

  propTypes:
    title:       React.PropTypes.string.isRequired
    activities:  React.PropTypes.number
    onClose:     React.PropTypes.func
    isDark:      React.PropTypes.bool

    # например popup--settings, popup--persons
    className:   React.PropTypes.string

  getDefaultProps: ->
    isDark: true

  componentWillMount:   -> Mousetrap.bind 'esc',   @close
  componentWillUnmount: -> Mousetrap.unbind 'esc', @close

  close: ->
    if @props.onClose?
      @props.onClose()
    else
      @unmount()

  render: ->

    # TODO block вынести в class
    # TODO координаты сохранять в localStorage
    style = { display: 'block', top: '30px', left: '36%'}

    classes = popup: true, 'popup--dark': @props.isDark
    classes[@props.className] = true if @props.className?
    cx = React.addons.classSet classes

    return `<div className={cx} style={style}>
              <PopupHeader title={ this.props.title }
                           activities={ this.props.activities }
                           onClickClose={ this.close }></PopupHeader>
              <div className="popup__body">
                { this.props.children }
              </div>
            </div>`

