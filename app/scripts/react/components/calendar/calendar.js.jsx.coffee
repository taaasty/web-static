###* @jsx React.DOM ###

CALENDAR_CLOSED = 'closed'
CALENDAR_OPENED_BY_HOVER = 'openedByHover'
CALENDAR_OPENED_BY_CLICK = 'openedByClick'

window.Calendar = Calendar = React.createClass

  propTypes:
    entry:    React.PropTypes.object
    tlogId:   React.PropTypes.number.isRequired

  getInitialState: ->
    calendar:    null
    open:        CALENDAR_CLOSED
    headerDate:  if @props.entry?.created_at then moment( @props.entry.created_at ) else moment()

  componentDidMount: ->
    @getCalendarFromServer @props.tlogId

  getCalendarFromServer: (tlogId) ->
    $.ajax
      url: Routes.api.calendar_url tlogId
      success: (calendar) =>
        @setState calendar: calendar
      error: (data) =>
        TastyNotifyController.errorResponse data

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

  render: ->
    calendarClasses = React.addons.classSet calendar: true, 'calendar--open': @isOpen()
    children = `<CalendarHeader date={ this.state.headerDate }></CalendarHeader>`

    if @isOpen()
      if @state.calendar
        children = `<CalendarTimeline currentEntry={ this.props.entry }
                                      periods={ this.state.calendar.periods }></CalendarTimeline>`
      else
        children = 'Loading..'

    return `<nav onClick={this.onClick}
                 onMouseEnter={this.onMouseEnter}
                 onMouseLeave={this.onMouseLeave}
                 className={ calendarClasses }
                 >
              { children }
            </nav>`

module.exports = Calendar
