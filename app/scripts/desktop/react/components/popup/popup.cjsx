classnames = require 'classnames'

NO_TRANSITION_CLASS = "no--transition"

window.Popup = React.createClass
  mixins: [ReactUnmountMixin, ReactPositionsMixin]

  propTypes:
    title:         React.PropTypes.string.isRequired
    type:          React.PropTypes.string
    hasActivities: React.PropTypes.bool
    onClose:       React.PropTypes.func
    colorScheme:   React.PropTypes.oneOf(['dark', 'light'])
    isDraggable:   React.PropTypes.bool
    position:      React.PropTypes.object

    # например popup--settings, popup--persons
    className:   React.PropTypes.string

  getDefaultProps: ->
    hasActivities: false
    isDark:        false
    isLight:       false
    isDraggable:   false

  componentDidMount: ->
    @makeDraggable() if @props.isDraggable

    Mousetrap.bind 'esc', @close

  componentWillUnmount: ->
    Mousetrap.unbind 'esc', @close

  render: ->
    popupClasses = classnames('popup', 'popup--center', @props.className, {
      'popup--dark': @props.colorScheme is 'dark'
      'popup--light': @props.colorScheme is 'light'
    })

    return <div className={ popupClasses }
                style={ this.initialPositionStyle() }>
             <PopupHeader title={ this.props.title } ref="header"
                          isDraggable= { this.props.isDraggable }
                          hasActivities={ this.props.hasActivities }
                          onClickClose={ this.close }></PopupHeader>
             <div className="popup__body">
               { this.props.children }
             </div>
           </div>

  makeDraggable: ->
    $popupNode = $(@getDOMNode())
    headboxNode = @refs.header.getDOMNode()

    $popupNode.draggable
      handle: headboxNode
      drag: -> $popupNode.addClass NO_TRANSITION_CLASS
      stop: (event, ui) =>
        @checkPosition()
        @savePosition ui.position
        $popupNode.removeClass NO_TRANSITION_CLASS

  close: ->
    if @props.onClose? then @props.onClose() else @unmount()