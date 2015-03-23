TlogEmptyPageMessage = require './emptyPageMessage'
EntryTlog            = require '../entry/tlog'
{ PropTypes } = React

Tlog = React.createClass
  displayName: 'Tlog'

  propTypes:
    entries: PropTypes.array.isRequired

  render: ->
    if @props.entries.length
      entryList = @props.entries.map (entry) ->
        <EntryTlog entry={ entry } key={ entry.id } />

      <div className="posts">
        { entryList }
      </div>
    else
      <TlogEmptyPageMessage />

module.exports = Tlog