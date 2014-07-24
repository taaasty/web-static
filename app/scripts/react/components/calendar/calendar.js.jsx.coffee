###* @jsx React.DOM ###

CALENDAR_CLOSED = 'closed'
CALENDAR_OPENED_BY_HOVER = 'openedByHover'
CALENDAR_OPENED_BY_CLICK = 'openedByClick'
TARGET_POST_CLASS = '.post'

window.Calendar = Calendar = React.createClass

  propTypes:
    entry:    React.PropTypes.object
    tlogId:   React.PropTypes.number.isRequired

  getInitialState: ->
    calendar:   null
    open:       CALENDAR_CLOSED
    headerDate: if @props.entry?.created_at then moment( @props.entry.created_at ) else moment()
    activePost: @props.entry?.id ? null

  componentDidMount: ->
    @getCalendarFromServer @props.tlogId
    @attachScrollSpy()

  componentWillUnmount: -> @dettachScrollSpy()

  render: ->
    calendarClasses = React.addons.classSet calendar: true, 'calendar--open': @isOpen(), 'calendar--closed': !@isOpen()
    children = `<CalendarHeader date={ this.state.headerDate } />`

    if @isOpen()
      if @state.calendar
        children = `<CalendarTimeline activePost={ this.state.activePost }
                                      currentEntry={ this.props.entry }
                                      periods={ this.state.calendar.periods }></CalendarTimeline>`
      else
        children = 'Loading..'

    return `<nav onClick={this.onClick}
                 onMouseEnter={this.onMouseEnter}
                 onMouseLeave={this.onMouseLeave}
                 className={ calendarClasses }>
              { children }
            </nav>`

  getCalendarFromServer: (tlogId) ->
    $.ajax
      url: Routes.api.calendar_url tlogId
      success: (calendar) =>
        @setState calendar: calendar
      error: (data) =>
        TastyNotifyController.errorResponse data

  attachScrollSpy: ->
    that = @
    $post = $(TARGET_POST_CLASS)

    $post.waypoint (direction) ->
      scrollTop = $(document).scrollTop()
      $el = $(@)
      $elTop = $el.offset().top
      $elTopWithHeight = $elTop + $el.outerHeight(true)

      console.info "Пост с id = #{$el.data('id')}, движение #{direction}"

      if $elTopWithHeight >= scrollTop >= $elTop
        # Активируется пост
        that.updateCurrentPost $el.data('id'), $el.data('time')

      if direction is 'up' && $el.waypoint('prev').length > 0
        $prevEl = $( $el.waypoint('prev') )
        $prevElTop = $prevEl.offset().top
        $prevElTopWithHeight = $prevElTop + $prevEl.outerHeight(true)

        if $prevElTopWithHeight >= scrollTop >= $prevElTop
          # Активируется предыдущий пост
          that.updateCurrentPost $prevEl.data('id'), $prevEl.data('time')

  updateCurrentPost: (id, time) ->
    date = moment(time)
    console.info "Активируется пост с id = #{id}, и time = #{time}"
    # Если на странице один пост, то стейт не будет обновляться, так как этот
    # пост стоит по-умолчанию
    unless @state.headerDate.toString() == date.toString() &&
           @state.activePost == id
      @setState headerDate: date, activePost: id

  dettachScrollSpy: ->
    $post = $(TARGET_POST_CLASS)
    $post.waypoint 'destroy'

  onMouseEnter: ->
    if @state.open == CALENDAR_CLOSED
      @setState open: CALENDAR_OPENED_BY_HOVER

  onMouseLeave: ->
    if @state.open == CALENDAR_OPENED_BY_HOVER
      @setState open: CALENDAR_CLOSED

  onClick: ->
    switch @state.open
      when CALENDAR_CLOSED          then @setState open: CALENDAR_OPENED_BY_CLICK
      when CALENDAR_OPENED_BY_CLICK then @setState open: CALENDAR_CLOSED
      when CALENDAR_OPENED_BY_HOVER then @setState open: CALENDAR_CLOSED
      else console.error? "Unknown state.open", @state.open

  isOpen: -> @state.open != CALENDAR_CLOSED

module.exports = Calendar