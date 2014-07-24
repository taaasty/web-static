###* @jsx React.DOM ###

CALENDAR_CLOSED = 'closed'
CALENDAR_OPENED_BY_HOVER = 'openedByHover'
CALENDAR_OPENED_BY_CLICK = 'openedByClick'
TARGET_POST_CLASS =        '.post'
TARGET_POST_PARENT_CLASS = '.posts'

window.Calendar = Calendar = React.createClass

  propTypes:
    entry:    React.PropTypes.object
    tlogId:   React.PropTypes.number.isRequired

  getInitialState: ->
    calendar:        null
    open:            CALENDAR_CLOSED
    headerDate:      if @props.entry?.created_at then moment( @props.entry.created_at ) else moment()
    selectedEntryId: @props.entry?.id ? null
    visibleMarkers:  null

  componentDidMount: ->
    @getCalendarFromServer @props.tlogId
    @attachScrollSpy()
    @setVisibleMarkers()

  componentWillUnmount: -> @dettachScrollSpy()

  render: ->
    calendarClasses = React.addons.classSet {
      calendar: true
      'calendar--open': @isOpen()
      'calendar--closed': !@isOpen()
      'calendar--opened-by-click': @isOpenedByClick()
    }
    children = `<CalendarHeader date={ this.state.headerDate } />`

    if @isOpen()
      if @state.calendar
        children = `<CalendarTimeline visibleMarkers={ this.state.visibleMarkers }
                                      selectedEntryId={ this.state.selectedEntryId }
                                      periods={ this.state.calendar.periods } />`
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

    # Следим за скроллингом, только если находимся на странице списка постов
    if $post.closest(TARGET_POST_PARENT_CLASS)
      $post.waypoint (direction) ->
        scrollTop = $(document).scrollTop()
        $el = $(@)
        $elTop = $el.offset().top
        $elTopWithHeight = $elTop + $el.outerHeight(true)

        console.info "Пост с id = #{$el.data('id')}, движение #{direction}"

        if $elTopWithHeight >= scrollTop >= $elTop
          # Активируется пост
          that.updateSelectedEntry $el.data('id'), $el.data('time')

        if direction is 'up' && $el.waypoint('prev').length > 0
          $prevEl = $( $el.waypoint('prev') )
          $prevElTop = $prevEl.offset().top
          $prevElTopWithHeight = $prevElTop + $prevEl.outerHeight(true)

          if $prevElTopWithHeight >= scrollTop >= $prevElTop
            # Активируется предыдущий пост
            that.updateSelectedEntry $prevEl.data('id'), $prevEl.data('time')

  dettachScrollSpy: ->
    $post = $(TARGET_POST_CLASS)
    $post.waypoint 'destroy'

  updateSelectedEntry: (id, time) ->
    date = moment(time)
    console.info "Активируется пост с id = #{id}, и time = #{time}"

    @setState headerDate: date, selectedEntryId: id

  setVisibleMarkers: ->
    $post   = $(TARGET_POST_CLASS)
    markers = []
    $post.each -> markers.push parseInt(@dataset.id)
    @setState visibleMarkers: markers

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
      when CALENDAR_OPENED_BY_HOVER then @setState open: CALENDAR_OPENED_BY_CLICK
      else console.error? "Unknown state.open", @state.open

  isOpen: -> @state.open != CALENDAR_CLOSED

  isOpenedByClick: -> @state.open == CALENDAR_OPENED_BY_CLICK

module.exports = Calendar