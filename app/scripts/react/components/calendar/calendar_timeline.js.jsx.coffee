###* @jsx React.DOM ###

window.CalendarTimeline = CalendarTimeline = React.createClass

  propTypes:
    periods:      React.PropTypes.array.isRequired
    currentEntry: React.PropTypes.object

  getInitialState: ->
    periodNodes: null

  componentDidMount: ->
    that = @
    periodNodes = @props.periods.map (period, i) ->
      `<CalendarPeriod currentEntry={ that.props.currentEntry } period={ period } key={ i }></CalendarPeriod>`

    @timeout = setTimeout (=>
      @setState(periodNodes: periodNodes)
    ), 300

  componentWillUnmount: -> clearTimeout @timeout

  render: ->
    if @state.periodNodes?
      return `<div className="calendar__timeline-viewport calendar__timeline-viewport--active">
                <div className="calendar__timeline">
                  <ul className="calendar__periods">{ this.state.periodNodes }</ul>
                </div>
              </div>`
    else
      return `<div className="calendar__timeline-viewport">
                  <div className="calendar__timeline"></div>
                </div>`

module.exports = CalendarTimeline