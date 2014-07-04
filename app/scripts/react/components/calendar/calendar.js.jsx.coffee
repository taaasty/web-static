###* @jsx React.DOM ###

window.Calendar = Calendar = React.createClass

  render: ->
   `<nav className="calendar">
      <CalendarHeader></CalendarHeader>
      <CalendarTimeline></CalendarTimeline>
    </nav>`

module.exports = Calendar