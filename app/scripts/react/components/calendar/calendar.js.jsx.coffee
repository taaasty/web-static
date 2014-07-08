###* @jsx React.DOM ###

window.Calendar = Calendar = React.createClass
  propTypes:
    calendar: React.PropTypes.object
    tlogId:   React.PropTypes.number

  getInitialState: ->
    open:     'closed'
    calendar: @props.calendar

  componentDidMount: ->
    if @props.tlogId?
      @getCalendarFromServer @props.tlogId
    else if @props.calendar?
      # все хорошо
    else
      console.error? 'В Calendar не передан ни tlogId ни calendar'

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
      else console.error? "Неизвестное состояние", @state.open

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
