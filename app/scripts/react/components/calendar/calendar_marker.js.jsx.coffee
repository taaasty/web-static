###* @jsx React.DOM ###

window.CalendarMarker = CalendarMarker = React.createClass

  mixins: [ReactGrammarMixin]

  propTypes:
    marker:       React.PropTypes.object.isRequired
    selected:     React.PropTypes.bool.isRequired

  getPercentValueOfDay: (day) ->
    (day * parseInt(100, 10) / parseInt(365, 10)).toFixed(2) + '%'

  getNumberOfRecords: (number) ->
    number + ' ' + @declension(number, ['комментарий', 'комментария', 'комментариев'])

  render: ->
    records = @getNumberOfRecords @props.marker.comments_count
    date = moment @props.marker.created_at
    createdAt = date.format 'D MMMM'
    leftIndent = @getPercentValueOfDay date.dayOfYear()

    markerClasses = React.addons.classSet 'calendar__period-marker': true, 'calendar__period-marker--current': @props.selected

    return `<a href={ this.props.marker.entry_url }
               data-marker-date={ createdAt }
               data-marker-rows={ records }
               className={ markerClasses }
               style={{ left: leftIndent }}></a>`

module.exports = CalendarMarker