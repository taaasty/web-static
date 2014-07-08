###* @jsx React.DOM ###

window.Calendar = Calendar = React.createClass

  getInitialState: ->
    open: 'closed'

  componentWillMount: ->
    if @props.user?
      @getCalendarFromServer(@props.user.id)
    else if @props.calendar?
      @setState(calendar: @props.calendar)

  getCalendarFromServer: (userId) ->
    $.ajax
      url: 'http://api.3000.vkontraste.ru/v1/tlog/1/calendar.json'
      type: 'GET'
      success: =>
        console.log arguments
      error: (data) =>
        console.log arguments

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
    calendarClasses = React.addons.classSet calendar: true, 'calendar--open': @state.open != 'closed'

    return `<nav onClick={this.onClick}
                 onMouseEnter={this.onMouseEnter}
                 onMouseLeave={this.onMouseLeave}
                 className={ calendarClasses }>
              <CalendarHeader date={ this.props.date }></CalendarHeader>
              <CalendarTimeline periods={ this.props.periods }></CalendarTimeline>
            </nav>`

module.exports = Calendar