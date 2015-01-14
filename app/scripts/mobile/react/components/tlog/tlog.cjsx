CurrentUserStore     = require '../../stores/currentUser'
ConnectStoreMixin    = require '../../mixins/connectStore'
TlogEmptyPageMessage = require './emptyPageMessage'
Entry                = require '../entry/entry'
{ PropTypes } = React

Tlog = React.createClass
  displayName: 'Tlog'
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
      <TlogEmptyPageMessage />

  getStateFromStore: ->
    user: CurrentUserStore.getUser()

module.exports = Tlog