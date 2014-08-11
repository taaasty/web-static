###* @jsx React.DOM ###

DROPDOWN_CLOSED = 'closed'
DROPDOWN_OPENED_BY_HOVER = 'openedByHover'
DROPDOWN_OPENED_BY_CLICK = 'openedByClick'

window.EntryMetabarDropdownMenu = React.createClass
  mixins: [ReactUnmountMixin, 'ReactActivitiesMixin']

  propTypes:
    entryId:                  React.PropTypes.number.isRequired
    isFavorited:              React.PropTypes.bool.isRequired
    isWatching:               React.PropTypes.bool.isRequired
    shouldRemoveFavoriteNode: React.PropTypes.bool
    entryUrl:                 React.PropTypes.string.isRequired
    editUrl:                  React.PropTypes.string.isRequired
    successDeleteUrl:         React.PropTypes.string
    canEdit:                  React.PropTypes.bool.isRequired
    canFavorite:              React.PropTypes.bool.isRequired
    canWatch:                 React.PropTypes.bool.isRequired
    canReport:                React.PropTypes.bool.isRequired
    canDelete:                React.PropTypes.bool.isRequired

  getInitialState: ->
    currentState: DROPDOWN_CLOSED

  render: ->
    actionList = []
    menuClasses = React.addons.classSet {
      'meta-item__dropdown': true
      'state--open': @isOpen() || @hasActivities()
    }

    if @props.canEdit
      actionList.push `<EntryMetabarDropdownMenuItem title="Редактировать"
                                                     icon="icon--pencil"
                                                     href={ this.props.editUrl }
                                                     key="edit" />`
    actionList.push `<EntryMetabarDropdownMenuItem title="Ссылка на запись"
                                                   icon="icon--hyperlink"
                                                   href={ this.props.entryUrl }
                                                   key="link" />`
    if @props.canFavorite
      actionList.push `<EntryMetabarDropdownMenuFavoriteItem entryId={ this.props.entryId }
                                                             isFavorited={ this.props.isFavorited }
                                                             shouldRemoveFavoriteNode={ this.props.shouldRemoveFavoriteNode }
                                                             key="favorite" />`
    if @props.canWatch
      actionList.push `<EntryMetabarDropdownMenuWatchItem entryId={ this.props.entryId }
                                                          isWatching={ this.props.isWatching }
                                                          key="watch" />`
    if @props.canReport
      actionList.push `<EntryMetabarDropdownMenuReportItem entryId={ this.props.entryId }
                                                           key="report" />`
    if @props.canDelete
      actionList.push `<EntryMetabarDropdownMenuDeleteItem entryId={ this.props.entryId }
                                                           successDeleteUrl={ this.props.successDeleteUrl }
                                                           onDelete={ this.onDelete }
                                                           activitiesHandler={ this.activitiesHandler }
                                                           key="delete" />`
    return `<span className="meta-item meta-item--actions">
              <span onMouseEnter={ this.onMouseEnter }
                    onMouseLeave={ this.onMouseLeave }
                    className="meta-item__content">
                <i className="meta-item__common icon icon--dots" />
                <span className={ menuClasses }>{ actionList }</span>
              </span>
            </span>`

  # onClick: ->
  #   switch @state.currentState
  #     when DROPDOWN_CLOSED          then @setState currentState: DROPDOWN_OPENED_BY_CLICK
  #     when DROPDOWN_OPENED_BY_CLICK then @setState currentState: DROPDOWN_CLOSED
  #     when DROPDOWN_OPENED_BY_HOVER then @setState currentState: DROPDOWN_CLOSED
  #     else console.error? "Unknown state.currentState", @state.currentState

  onMouseEnter: ->
    if @state.currentState == DROPDOWN_CLOSED
      @setState currentState: DROPDOWN_OPENED_BY_HOVER

  onMouseLeave: ->
    if @state.currentState == DROPDOWN_OPENED_BY_HOVER
      @setState currentState: DROPDOWN_CLOSED

  onDelete: -> @unmount() if @isMounted()

  isOpen: -> @state.currentState != DROPDOWN_CLOSED