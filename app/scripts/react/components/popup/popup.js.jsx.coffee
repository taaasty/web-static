###* @jsx React.DOM ###

window.Popup = React.createClass
  mixins: [ReactUnmountMixin]

  propTypes:
    title:         React.PropTypes.string.isRequired
    hasActivities: React.PropTypes.bool
    onClose:       React.PropTypes.func
    isDark:        React.PropTypes.bool
    isDraggable:   React.PropTypes.bool
    offset:        React.PropTypes.object

    # например popup--settings, popup--persons
    className:   React.PropTypes.string

  getDefaultProps: ->
    hasActivities: false
    isDark:        true
    isDraggable:   false

  componentDidMount: ->
    $('body').addClass 'no-scroll'
    Mousetrap.bind 'esc', @close
    @makeDraggable() if @props.isDraggable
    $(window).on 'resize', @updateOffset

  componentWillUnmount: ->
    $('body').removeClass 'no-scroll'
    Mousetrap.unbind 'esc', @close
    $(window).off 'resize', @updateOffset

  render: ->
    classes = popup: true, 'popup--dark': @props.isDark, 'popup--center': true
    classes[@props.className] = true if @props.className?
    cx = React.addons.classSet classes

    return `<div className={cx}>
              <PopupHeader title={ this.props.title } ref="header"
                           isDraggable= { this.props.isDraggable }
                           hasActivities={ this.props.hasActivities }
                           onClickClose={ this.close }></PopupHeader>
              <div className="popup__body">
                { this.props.children }
              </div>
            </div>`

  updateOffset: ->
    $popupNode = $(@getDOMNode())
    popupPosition = PositionsController.smartRestorePosition @props.title
    $popupNode.css popupPosition if popupPosition?
    
    # TODO Сделать анимацию подстраивания попапа в пределах экрана
    # clearTimeout @resizeTimeout if @resizeTimeout?
    # @resizeTimeout = setTimeout (->

    # ), 1000

  makeDraggable: ->
    $popupNode = $(@getDOMNode())
    $headboxNode = @refs.header.getDOMNode()
    popupPosition = ( PositionsController.smartRestorePosition(@props.title) ) || @props.offset
    $popupNode.css popupPosition if popupPosition?

    $popupNode.draggable
      handle: $headboxNode
      stop: (event, ui) => PositionsController.savePosition @props.title, ui.offset

  close: ->
    if @props.onClose? then @props.onClose() else @unmount()