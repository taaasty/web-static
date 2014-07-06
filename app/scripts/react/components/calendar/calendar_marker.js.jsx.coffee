###* @jsx React.DOM ###

window.CalendarMarker = CalendarMarker = React.createClass

  mixins: [ReactGrammarMixin]

  getPercentValueOfDay: (day) ->
    (day * parseInt(100, 10) / parseInt(365, 10)).toFixed(2) + '%'

  getNumberOfRecords: (number) ->
    number + ' ' + @declension(number, ['запись', 'записи', 'записей'])

  render: ->
    records = @getNumberOfRecords @props.marker.comments_count
    date = moment @props.marker.created_at
    createdAt = date.format 'D MMMM'
    leftIndent = @getPercentValueOfDay date.dayOfYear()

    return `<a href="#"
               data-marker-date={ createdAt }
               data-marker-rows={ records }
               className="calendar__period-marker"
               style={{ left: leftIndent }}></a>`

module.exports = CalendarMarker