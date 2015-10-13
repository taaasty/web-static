classnames = require 'classnames'

MOUSE_LEAVE_TIMEOUT = 300
CALENDAR_CLOSED          = 'closed'
CALENDAR_OPENED_BY_HOVER = 'openedByHover'
CALENDAR_OPENED_BY_CLICK = 'openedByClick'
TARGET_POST_CLASS        = '.post'
TARGET_POST_PARENT_CLASS = '.posts'
  
window.Calendar = React.createClass
  mixins: [RequesterMixin, ComponentManipulationsMixin]

  propTypes:
    entryId:         React.PropTypes.number
    entryCreatedAt:  React.PropTypes.string
    tlogId:          React.PropTypes.number.isRequired

  getInitialState: ->
    calendar:        null
    currentState:    CALENDAR_CLOSED
    headerDate:      @headerDate()
    selectedEntryId: @props.entryId
    visibleMarkers:  null

  componentDidMount: ->
    @getCalendarFromServer @props.tlogId
    @setVisibleMarkers()

    $post = $(TARGET_POST_CLASS)

    # Следим за скроллингом, только если находимся на странице списка постов
    if $post.closest(TARGET_POST_PARENT_CLASS)
      $(document).on('waypoint.trigger', (ev, { id, time }) =>
        this.updateSelectedEntry(id, time);
      )

  componentWillUnmount: ->
    clearTimeout @timeout if @timeout

  render: ->
    calendarClasses = classnames('calendar', {
      'calendar--open': @isOpen()
      'calendar--closed': !@isOpen()
      'calendar--opened-by-click': @isOpenedByClick()
    })
    children = <CalendarHeader date={ this.state.headerDate } />

    if @isOpen()
      if @state.calendar?.periods?.length > 0
        children = <CalendarTimeline visibleMarkers={ this.state.visibleMarkers }
                                     selectedEntryId={ this.state.selectedEntryId }
                                     periods={ this.state.calendar.periods } />
      else
        if @state.calendar?.periods?.length == 0
          message = <div>{ i18n.t('calendar_empty') }</div>
        else
          message = <span className="spinner spinner--24x24"><span className="spinner__icon"></span></span>

        children = <div className="grid-full text--center">
                     <div className="grid-full__middle">{ message }</div>
                   </div>

    return <nav onClick={ this.onClick }
                onMouseEnter={ this.onMouseEnter }
                onMouseLeave={ this.onMouseLeave }
                className={ calendarClasses }>
             { children }
           </nav>

  getCalendarFromServer: (tlogId) ->
    @createRequest
      url: ApiRoutes.calendar_url tlogId
      success: (calendar) =>
        @safeUpdateState calendar: calendar
      error: (data) =>
        NoticeService.errorResponse data

  updateSelectedEntry: (id, time) ->
    date = moment(time)
    # console.info "Активируется пост с id = #{id}, и time = #{time}"

    @setState headerDate: date, selectedEntryId: id

  setVisibleMarkers: ->
    $post   = $(TARGET_POST_CLASS)
    markers = []
    $post.each -> markers.push parseInt(@dataset.id)
    @setState visibleMarkers: markers

  onMouseEnter: ->
    clearTimeout @timeout if @timeout

    if @state.currentState == CALENDAR_CLOSED
      @setState currentState: CALENDAR_OPENED_BY_HOVER

  onMouseLeave: ->
    if @state.currentState == CALENDAR_OPENED_BY_HOVER
      @timeout = setTimeout (=>
        @safeUpdateState currentState: CALENDAR_CLOSED
      ), MOUSE_LEAVE_TIMEOUT

  onClick: ->
    switch @state.currentState
      when CALENDAR_CLOSED          then @setState currentState: CALENDAR_OPENED_BY_CLICK
      when CALENDAR_OPENED_BY_CLICK then @setState currentState: CALENDAR_CLOSED
      when CALENDAR_OPENED_BY_HOVER then @setState currentState: CALENDAR_OPENED_BY_CLICK
      else console.error? "Unknown state.currentState", @state.currentState

  isOpen: -> @state.currentState != CALENDAR_CLOSED

  isOpenedByClick: -> @state.currentState == CALENDAR_OPENED_BY_CLICK

  headerDate: ->
    moment( @props.entryCreatedAt ? @firstPostDate() )

  firstPostDate: ->
    try
      $(TARGET_POST_CLASS).get(0).dataset.time
    catch error
      console.error? error
