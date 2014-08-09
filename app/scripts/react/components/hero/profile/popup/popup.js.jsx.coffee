###* @jsx React.DOM ###

MARGIN = 10
FADE_DURATION = 300

window.HeroProfileStats_Popup = React.createClass
  mixins: ['ReactActivitiesMixin', ReactUnmountMixin]

  propTypes:
    title:   React.PropTypes.string.isRequired
    toggle:  React.PropTypes.object.isRequired
    onClose: React.PropTypes.func

  componentDidMount: ->
    @alignPopup()
    @open()

    TastyEvents.on TastyEvents.keys.hero_closed(), @close
    $(window).one 'resize', @close

  componentWillUnmount: ->
    $(window).off 'resize', @close

  componentDidUpdate: -> @alignPopup()

  render: ->
    React.Children.map @props.children, (context) =>
      context.props.activitiesHandler = @activitiesHandler

    return `<div className="popup popup--dark">
              <div className="popup__arrow popup__arrow--down"></div>
              <PopupHeader hasActivities={ this.hasActivities() }
                           title={ this.props.title }
                           isDraggable= { this.props.isDraggable }
                           onClickClose={ this.close } />
              <div className="popup__body">{ this.props.children }</div>
            </div>`

  getPopupOffset: ->
    widthPopup = @$popup.width()
    heightPopup = @$popup.height()
    widthToggle = @$toggle.outerWidth()
    heightToggle = @$toggle.outerHeight()
    offsetTop = @$toggle.offset().top
    offsetLeft = @$toggle.offset().left

    getCenterLeft = ->
      offsetLeft - (widthPopup - widthToggle) / 2

    { top: offsetTop - heightPopup - MARGIN, left: getCenterLeft() }

  alignPopup: ->
    @$popup =  $( @getDOMNode() )
    @$toggle = @props.toggle
    @$popup.css {
      left: @getPopupOffset().left
      top:  @getPopupOffset().top
    }

  open: ->
    @$popup.css('display', 'none').fadeIn FADE_DURATION

  close: ->
    @$popup.fadeOut FADE_DURATION, @unmount