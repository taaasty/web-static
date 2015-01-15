cx = require 'react/lib/cx'

#TODO: Refactor. Every panel type should have separate component instead of generic one 
#TODO: i18n
LOADING_ERROR = 'Ошибка загрузки.'
LOADING       = 'Загружаю..'
EMPTY_LIST    = 'Список пуст.'

ERROR_STATE   = 'error'
LOADED_STATE  = 'loaded'
LOADING_STATE = 'loading'

window.PersonsPopup_PanelMixin =

  getInitialState: ->
    _.extend @getStateFromStore(), currentState: LOADING_STATE

  componentWillMount: ->
    @loadPanelData()

  componentDidMount: ->
    RelationshipsStore.addChangeListener @onStoreChange

  componentWillUnmount: ->
    RelationshipsStore.removeChangeListener @onStoreChange

  render: ->
    Item = @itemClass()

    if @hasRelationships()
      relationships = @state.relationships.map (relationship) =>
        <Item relationship={ relationship } key={ relationship.id } />

      panelContent = <ul className="persons">{ relationships }</ul>
    else
      switch @state.currentState
        when ERROR_STATE   then messageText = LOADING_ERROR
        when LOADING_STATE then messageText = LOADING
        when LOADED_STATE  then messageText = EMPTY_LIST
        else console.warn 'Unknown currentState', @state.currentState

      panelContent = <div className="grid-full">
                       <div className="grid-full__middle">
                         <div className="popup__text">
                           { messageText }
                         </div>
                       </div>
                     </div>

    unless @isAllRelationshipsLoaded()
      loadMoreButton = <LoadMoreButton onClick={ this.loadMoreData } />

    return <div className="tabs-panel">
             <div className="scroller scroller--persons" ref="scroller">
               <div className="scroller__pane js-scroller-pane">
                 { panelContent }
                 { loadMoreButton }
               </div>
               <div className="scroller__track js-scroller-track">
                 <div className="scroller__bar js-scroller-bar"></div>
               </div>
             </div>
           </div>

  hasRelationships:         -> @state.relationships?.length > 0
  isPanelDataLoaded:        -> @state.relationships?
  isAllRelationshipsLoaded: -> @state.relationships?.length == @state.totalCount

  isLoadingState: -> @state.currentState is LOADING_STATE

  activateLoadedState:  -> @safeUpdateState(currentState: LOADED_STATE)
  activateLoadingState: -> @safeUpdateState(currentState: LOADING_STATE)
  activateErrorState:   -> @safeUpdateState(currentState: ERROR_STATE)

  loadPanelData: (sincePosition, options) ->
    @safeUpdate => @incrementActivities()
    @activateLoadingState()

    @createRequest
      url: @relationUrl()
      data:
        since_position: sincePosition
        expose_reverse: 1
      success: (data) =>
        if options?.success
          options.success(data)
        else
          RelationshipsDispatcher.handleServerAction
            type: 'relationshipsLoaded'
            relationship: @relationshipType
            items: data.relationships
      error: (data) =>
        @activateErrorState()
        TastyNotifyController.errorResponse data
      complete: =>
        @activateLoadedState()
        @safeUpdate => @decrementActivities()

  loadMoreData: ->
    return if @isLoadingState()

    lastLoadedPosition = @state.relationships[@state.relationships.length - 1].position
    @loadPanelData lastLoadedPosition,
      success: (data) =>
        RelationshipsDispatcher.handleServerAction
          type: 'moreRelationshipsLoaded'
          relationship: @relationshipType
          items: data.relationships

  onStoreChange: ->
    @setState @getStateFromStore()

React.mixins.add 'PersonsPopup_PanelMixin', [
  PersonsPopup_PanelMixin, window.RequesterMixin, 'ReactActivitiesUser',
  ComponentManipulationsMixin, ScrollerMixin
]