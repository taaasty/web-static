TlogEmptyPageMessage = require './emptyPageMessage'
EntryTlog            = require '../entry/tlog'
{ PropTypes } = React

Tlog = React.createClass
  displayName: 'Tlog'

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
      <TlogEmptyPageMessage />

module.exports = Tlog