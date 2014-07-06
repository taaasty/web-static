###* @jsx React.DOM ###

window.CalendarHeader = CalendarHeader = React.createClass

  render: ->
   `<div className="calendar__date">
      <div className="calendar__date-day">{ this.props.date.day }</div>
      <div className="calendar__date-info"
           dangerouslySetInnerHTML={{ __html: this.props.date.info }}>
      </div>
    </div>`

module.exports = CalendarHeader