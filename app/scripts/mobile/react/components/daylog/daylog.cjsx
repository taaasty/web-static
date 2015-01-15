DaylogEmptyPageMessage = require './emptyPageMessage'
EntryTlog              = require '../entry/tlog'
{ PropTypes } = React

Daylog = React.createClass
  displayName: 'Daylog'

  propTypes:
    entries: PropTypes.array.isRequired

  render: ->
    <div className="posts">
      { @renderEntryList() }
    </div>

  renderEntryList: ->
    if @props.entries.length
      @props.entries.map (entry) ->
        <EntryTlog entry={ entry } key={ entry.id } />
    else
      <DaylogEmptyPageMessage />

module.exports = Daylog