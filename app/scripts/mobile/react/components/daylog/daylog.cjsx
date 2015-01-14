CurrentUserStore       = require '../../stores/currentUser'
ConnectStoreMixin      = require '../../mixins/connectStore'
DaylogEmptyPageMessage = require './emptyPageMessage'
Entry                  = require '../entry/entry'
{ PropTypes } = React

Daylog = React.createClass
  displayName: 'Daylog'
  mixins: [ConnectStoreMixin(CurrentUserStore)]

  propTypes:
    entries: PropTypes.array.isRequired

  render: ->
    <div className="posts">
      { @renderEntryList() }
    </div>

  renderEntryList: ->
    if @props.entries.length
      @props.entries.map (entry) ->
        <Entry entry={ entry } key={ entry.id } />
    else
      <DaylogEmptyPageMessage />

  getStateFromStore: ->
    user: CurrentUserStore.getUser()

module.exports = Daylog