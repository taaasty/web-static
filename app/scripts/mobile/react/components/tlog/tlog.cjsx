CurrentUserStore  = require '../../stores/currentUser'
ConnectStoreMixin = require '../../mixins/connectStore'
Entry             = require '../entry/entry'
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
    @props.entries.map (entry) ->
      <Entry entry={ entry } key={ entry.id } />

  getStateFromStore: ->
    user: CurrentUserStore.getUser()

module.exports = Tlog