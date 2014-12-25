EntryViewActions = require '../../../../../../actions/view/entry'
{ PropTypes } = React

#TODO: i18n
START_WATCH_TITLE = 'Подписаться на комментарии'
STOP_WATCH_TITLE  = 'Отписаться от комментариев'

module.exports = React.createClass
  displayName: 'EntryMetaActions_DropdownMenuWatchItem'

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
    if @isWatching() then STOP_WATCH_TITLE else START_WATCH_TITLE

  startWatch: ->
    EntryViewActions.startWatch @props.entryId
      .then => @setState(watching: true)

  stopWatch: ->
    EntryViewActions.stopWatch @props.entryId
      .then => @setState(watching: false)

  handleClick: (e) ->
    e.preventDefault()
    e.stopPropagation()
    if @isWatching() then @stopWatch() else @startWatch()