###* @jsx React.DOM ###

window.CalendarMarker = CalendarMarker = React.createClass

  mixins: [ReactGrammarMixin]

  render: ->
    records   = @props.marker.comments_count + ' ' +
                @declension(@props.marker.comments_count, ['запись', 'записи', 'записей'])
    createdAt = moment(@props.marker.created_at).format("D MMMM")

    return `<a href="#"
               data-marker-date={ createdAt }
               data-marker-rows={ records }
               className="calendar__period-marker"></a>`

module.exports = CalendarMarker