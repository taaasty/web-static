###* @jsx React.DOM ###

window.Calendar = Calendar = React.createClass

  getInitialState: ->
    open:     'closed'
    calendar: @props.calendar

  componentDidMount: ->
    if @props.tlogId?
      @getCalendarFromServer @props.tlogId
    else
      console.log 'В Calendar не передан tlogId'

  getCalendarFromServer: (tlogId) ->
    $.ajax
      url: Routes.api.calendar_url tlogId
      success: (calendar) =>
        @setState calendar: calendar
      error: (data) =>
        TastyNotifyController.errorResponse data

  onMouseEnter: ->
    if @state.open == 'closed'
      @setState(open: 'openedByHover')

  onMouseLeave: ->
    if @state.open == 'openedByHover'
      @setState(open: 'closed')

  onClick: ->
    switch @state.open
      when 'closed' then @setState(open: 'openedByClick')
      when 'openedByClick' then @setState(open: 'closed')
      when 'openedByHover' then @setState(open: 'closed')

  render: ->
    if @state.calendar?
      calendarClasses = React.addons.classSet calendar: true, 'calendar--open': @state.open != 'closed'

      return `<nav onClick={this.onClick}
                   onMouseEnter={this.onMouseEnter}
                   onMouseLeave={this.onMouseLeave}
                   className={ calendarClasses }>
                <CalendarHeader date={ this.props.date }></CalendarHeader>
                <CalendarTimeline periods={ this.state.calendar.periods }></CalendarTimeline>
              </nav>`
    else
      return `<div></div>`

    
module.exports = Calendar