###* @jsx React.DOM ###

window.CalendarHeader = CalendarHeader = React.createClass

  render: ->
   `<div className="calendar__date">
      <div className="calendar__date-day">31</div>
      <div className="calendar__date-info">декабря<br /> воскресенье<br /> 23:34</div>
    </div>`

module.exports = CalendarHeader