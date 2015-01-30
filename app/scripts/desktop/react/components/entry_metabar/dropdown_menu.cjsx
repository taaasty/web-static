cx = require 'react/lib/cx'

MOUSE_LEAVE_TIMEOUT = 300
DROPDOWN_CLOSED          = 'closed'
DROPDOWN_OPENED_BY_HOVER = 'openedByHover'
DROPDOWN_OPENED_BY_CLICK = 'openedByClick'
MARGIN_BETWEEN_TOGGLER_AND_MENU = 20

window.EntryMetabarDropdownMenu = React.createClass
  mixins: [ReactUnmountMixin, 'ReactActivitiesMixin', ComponentManipulationsMixin]

  propTypes:
    entryId:                  React.PropTypes.number.isRequired
    isFavorited:              React.PropTypes.bool.isRequired
    isWatching:               React.PropTypes.bool.isRequired
    shouldRemoveFavoriteNode: React.PropTypes.bool
    entryUrl:                 React.PropTypes.string.isRequired
    editUrl:                  React.PropTypes.string
    successDeleteUrl:         React.PropTypes.string
    canEdit:                  React.PropTypes.bool
    canFavorite:              React.PropTypes.bool
    canWatch:                 React.PropTypes.bool
    canReport:                React.PropTypes.bool
    canDelete:                React.PropTypes.bool

  getInitialState: ->
    currentState: DROPDOWN_CLOSED

  componentDidMount: ->
    @$dropdownMenu = $( @refs.dropdownMenu.getDOMNode() )

  componentWillUnmount: ->
    clearTimeout @timeout if @timeout

  render: ->
    actionList = []
    menuClasses = cx
      'meta-item__dropdown': true
      'state--open'        : @isOpen() || @hasActivities()
      'position-top'       : @isPositionTop()

    menuStyles = marginTop: @_getTopPosition()

    if @props.canEdit
      actionList.push <EntryMetabarDropdownMenuItem title={ i18n.t('edit_entry_item') }
                                                    icon="icon--pencil"
                                                    href={ this.props.editUrl }
                                                    key="edit" />
    actionList.push <EntryMetabarDropdownMenuItem title={ i18n.t('link_entry_item') }
                                                  icon="icon--hyperlink"
                                                  href={ this.props.entryUrl }
                                                  key="link" />
    if @props.canFavorite
      actionList.push <EntryMetabarDropdownMenuFavoriteItem entryId={ this.props.entryId }
                                                            isFavorited={ this.props.isFavorited }
                                                            shouldRemoveFavoriteNode={ this.props.shouldRemoveFavoriteNode }
                                                            key="favorite" />
    if @props.canWatch
      actionList.push <EntryMetabarDropdownMenuWatchItem entryId={ this.props.entryId }
                                                         isWatching={ this.props.isWatching }
                                                         key="watch" />
    if @props.canReport
      actionList.push <EntryMetabarDropdownMenuReportItem entryId={ this.props.entryId }
                                                          key="report" />
    if @props.canDelete
      actionList.push <EntryMetabarDropdownMenuDeleteItem entryId={ this.props.entryId }
                                                          successDeleteUrl={ this.props.successDeleteUrl }
                                                          onDelete={ this.onDelete }
                                                          activitiesHandler={ this.activitiesHandler }
                                                          key="delete" />

    return <span className="meta-item meta-item--actions">
             <span onMouseEnter={ this.onMouseEnter }
                   onMouseLeave={ this.onMouseLeave }
                   onClick={ this.onClick }
                   className="meta-item__content">
               <i className="meta-item__common icon icon--dots" />
               <span ref="dropdownMenu"
                     className={ menuClasses }
                     style={ menuStyles }>
                 { actionList }
               </span>
             </span>
           </span>

  isOpen: -> @state.currentState != DROPDOWN_CLOSED

  isPositionTop: -> @_getTopPosition()?

  _getTopPosition: ->
    return unless @$dropdownMenu

    windowHeight        = $(window).height()
    windowScrollTop     = $(window).scrollTop()
    menuHeight          = @$dropdownMenu.innerHeight()
    menuOffset          = @$dropdownMenu.offset()
    menuScrollTopWindow = menuOffset.top - windowScrollTop
    menuMarginTop       = parseInt( @$dropdownMenu.css 'margin-top' )

    menuScrollTopWindow -= menuMarginTop if menuMarginTop

    if (menuScrollTopWindow + menuHeight) > windowHeight
      (menuHeight + MARGIN_BETWEEN_TOGGLER_AND_MENU) * -1

  onMouseEnter: ->
    clearTimeout @timeout if @timeout

    if @state.currentState == DROPDOWN_CLOSED
      @setState currentState: DROPDOWN_OPENED_BY_HOVER

  onMouseLeave: ->
    if @state.currentState == DROPDOWN_OPENED_BY_HOVER
      @timeout = setTimeout ( =>
        @safeUpdateState currentState: DROPDOWN_CLOSED
      ), MOUSE_LEAVE_TIMEOUT

  onDelete: -> @unmount() if @isMounted()

  onClick: ->
    switch @state.currentState
      when DROPDOWN_CLOSED          then @setState currentState: DROPDOWN_OPENED_BY_CLICK
      when DROPDOWN_OPENED_BY_CLICK then @setState currentState: DROPDOWN_CLOSED
      when DROPDOWN_OPENED_BY_HOVER then @setState currentState: DROPDOWN_CLOSED
      else console.error? "Unknown state.currentState", @state.currentState