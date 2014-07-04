###* @jsx React.DOM ###

window.CalendarHeader = CalendarHeader = React.createClass

  propTypes:
    day:  React.PropTypes.number
    info: React.PropTypes.string

  render: ->
   `<div className="calendar__date">
      <div className="calendar__date-day">{ this.props.day }</div>
      <div className="calendar__date-info"
           dangerouslySetInnerHTML={{__html: this.props.info}}>
      </div>
    </div>`

module.exports = CalendarHeader