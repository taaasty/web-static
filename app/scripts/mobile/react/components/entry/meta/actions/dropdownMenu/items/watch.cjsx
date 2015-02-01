EntryViewActions = require '../../../../../../actions/view/entry'
{ PropTypes } = React

EntryMetaActions_DropdownMenu_WatchItem = React.createClass
  displayName: 'EntryMetaActions_DropdownMenu_WatchItem'

  propTypes:
    entryId:  PropTypes.number.isRequired
    watching: PropTypes.bool.isRequired

  getInitialState: ->
    watching: @props.watching

  render: ->
    <li className="meta-actions__dropdown-popup-item">
      <a className="meta-actions__dropdown-popup-link"
         onClick={ @handleClick }>
        <i className="icon icon--comments-subscribe" />
        <span>{ @getTitle() }</span>
      </a>
    </li>

  isWatching: -> @state.watching

  getTitle: ->
    if @isWatching() then i18n.t 'entry.stop_watch_item' else i18n.t 'entry.start_watch_item'

  startWatch: ->
    EntryViewActions.startWatch @props.entryId
      .then => @setState(watching: true)

  stopWatch: ->
    EntryViewActions.stopWatch @props.entryId
      .then => @setState(watching: false)

  handleClick: ->
    if @isWatching() then @stopWatch() else @startWatch()

module.exports = EntryMetaActions_DropdownMenu_WatchItem