###* @jsx React.DOM ###

HANDLE_CLASS        = '.js-popup-headbox'
NO_TRANSITION_CLASS = 'no--transition'
CONTAINMENT         = '.page'

window.Popup = React.createClass
  mixins: [ReactUnmountMixin]

  propTypes:
    title:       React.PropTypes.string.isRequired
    activities:  React.PropTypes.number
    onClose:     React.PropTypes.func
    isDark:      React.PropTypes.bool
    draggable:   React.PropTypes.bool

    # например popup--settings, popup--persons
    className:   React.PropTypes.string

  getDefaultProps: ->
    isDark: true

  componentDidMount:   ->
    $('body').addClass 'no-scroll'
    Mousetrap.bind 'esc',   @close

  componentDidMount: -> @makeDraggable() if @props.draggable

  componentWillUnmount: ->
    $('body').removeClass 'no-scroll'
    Mousetrap.unbind 'esc', @close

  close: ->
    if @props.onClose?
      @props.onClose()
    else
      @unmount()

  render: ->
    # TODO координаты сохранять в localStorage
    classes = popup: true, 'popup--dark': @props.isDark, 'popup--center': true
    classes[@props.className] = true if @props.className?
    cx = React.addons.classSet classes

    return `<div className={cx} ref="popupPersons">
              <PopupHeader title={ this.props.title }
                           draggable= { this.props.draggable }
                           activities={ this.props.activities }
                           onClickClose={ this.close }></PopupHeader>
              <div className="popup__body">
                { this.props.children }
              </div>
            </div>`

  makeDraggable: ->
    $node = $(@refs.popupPersons.getDOMNode())

    $node.draggable
      handle:      HANDLE_CLASS
      containment: CONTAINMENT
      drag: -> $node.addClass NO_TRANSITION_CLASS
      stop: -> $node.removeClass NO_TRANSITION_CLASS