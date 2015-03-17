global.Api = require '../../api/api'
{ PropTypes } = React

SearchResults = React.createClass
  displayName: 'SearchResults'

  propTypes:
    q: PropTypes.string.isRequired
    style: PropTypes.string.isRequired
    searchUrl: PropTypes.string

  getDefaultProps: ->
    searchUrl: 'http://taaasty.com/best'
    # searchUrl: window.location.href

  getInitialState: ->
    page: 0
    loading: true
    everythingLoaded: false

  render: ->
    return <div />
    switch @props.style
      when 'tlog'
        <SearchResultsTlog
            html={ @state.html }
            loading={ @state.loading }
            onLoadNextPage={ @loadNextPage } />
      when 'feed'
        <SearchResultsFeed
            html={ @state.html }
            loading={ @state.loading }
            onLoadNextPage={ @loadNextPage } />
      else null

  loadNextPage: ->
    nextPage = @state.page + 1
    Api.search.loadNextPage({q: 'test', page: 2, url: 'http://taaasty.com/best'})

module.exports = SearchResults
#     Api.search.loadNextPage

#     @safeUpdateState(currentState: APPEND_LOADING_STATE)

#     @createRequest
#       # Component should be included only on feed pages like http://taaasty.ru/best
#       # When you are making some changes in static, need set url value as production
#       # url, i.e. http://taaasty.ru/best
#       url: window.location.href
#       data:
#         style: @props.style
#         since_entry_id: nextEntryId
#       success: (feedHtml) =>
#         if feedHtml is ''
#           @safeUpdateState(isEverythingLoaded: true)
#           return

#         newFeedHtml = if @state.feedHtml? then @state.feedHtml + feedHtml else feedHtml

#         @safeUpdateState(feedHtml: newFeedHtml)

#         $(document).trigger 'page:change'
#       error: (data) =>
#         TastyNotifyController.errorResponse data
#       complete: =>
#         @safeUpdateState(currentState: LOADED_STATE)

#   handleBottomNear: (lastItemId) ->
#     if !@isLoadingState() && !@state.isEverythingLoaded
#       @getFeedData lastItemId





#     sinceEntryId = @state.entries[@state.entries.length - 1].id
#     limit        = @props.limit

#     @activateLoadingState()

#     FeedViewActions.loadBestEntries sinceEntryId, limit
#       .then @activateShowState
#       .fail @activateErrorState


# module.exports = SearchResults



# APPEND_LOADING_STATE  = 'appendLoading'
# PREPEND_LOADING_STATE = 'prependLoading'
# LOADED_STATE          = 'loaded'

# window.Feed = React.createClass
#   mixins: [RequesterMixin, ComponentManipulationsMixin]

#   propTypes:
#     style: React.PropTypes.string.isRequired

#   getInitialState: ->
#     feedHtml:           null
#     currentState:       null
#     isEverythingLoaded: null

#   componentDidMount: ->
#     @getFeedData()

#   render: ->
#     switch @props.style
#       when 'tlog'
#         feedContent = <FeedTlog feedHtml={ this.state.feedHtml }
#                                 isLoadingNew={ this.state.currentState == PREPEND_LOADING_STATE }
#                                 isLoadingPrevious={ this.state.currentState == APPEND_LOADING_STATE }
#                                 onBottomNear={ this.handleBottomNear } />
#       when 'feed'
#         feedContent = <FeedBricks feedHtml={ this.state.feedHtml }
#                                   isLoadingNew={ this.state.currentState == PREPEND_LOADING_STATE }
#                                   isLoadingPrevious={ this.state.currentState == APPEND_LOADING_STATE }
#                                   onBottomNear={ this.handleBottomNear } />

#     return feedContent

#   isLoadingState: -> @state.currentState is APPEND_LOADING_STATE  ||
#                      @state.currentState is PREPEND_LOADING_STATE

#   getFeedData: (nextEntryId) ->
#     @safeUpdateState(currentState: APPEND_LOADING_STATE)

#     @createRequest
#       # Component should be included only on feed pages like http://taaasty.ru/best
#       # When you are making some changes in static, need set url value as production
#       # url, i.e. http://taaasty.ru/best
#       url: window.location.href
#       data:
#         style: @props.style
#         since_entry_id: nextEntryId
#       success: (feedHtml) =>
#         if feedHtml is ''
#           @safeUpdateState(isEverythingLoaded: true)
#           return

#         newFeedHtml = if @state.feedHtml? then @state.feedHtml + feedHtml else feedHtml

#         @safeUpdateState(feedHtml: newFeedHtml)

#         $(document).trigger 'page:change'
#       error: (data) =>
#         TastyNotifyController.errorResponse data
#       complete: =>
#         @safeUpdateState(currentState: LOADED_STATE)

#   handleBottomNear: (lastItemId) ->
#     if !@isLoadingState() && !@state.isEverythingLoaded
#       @getFeedData lastItemId