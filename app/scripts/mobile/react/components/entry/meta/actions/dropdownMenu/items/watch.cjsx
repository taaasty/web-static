i18n             = require 'i18next'
EntryViewActions = require '../../../../../../actions/view/entry'
{ PropTypes } = React

START_WATCH_TITLE = -> i18n.t 'start_watch_entry_item'
STOP_WATCH_TITLE  = -> i18n.t 'stop_watch_entry_item'

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
    if @isWatching() then STOP_WATCH_TITLE() else START_WATCH_TITLE()

  startWatch: ->
    EntryViewActions.startWatch @props.entryId
      .then => @setState(watching: true)

  stopWatch: ->
    EntryViewActions.stopWatch @props.entryId
      .then => @setState(watching: false)

  handleClick: ->
    if @isWatching() then @stopWatch() else @startWatch()

module.exports = EntryMetaActions_DropdownMenu_WatchItem