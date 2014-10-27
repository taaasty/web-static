###* @jsx React.DOM ###

APPEND_LOADING_STATE  = 'appendLoading'
PREPEND_LOADING_STATE = 'prependLoading'
LOADED_STATE          = 'loaded'

window.Feed = React.createClass
  mixins: [RequesterMixin, ComponentManipulationsMixin]

  propTypes:
    style: React.PropTypes.string.isRequired

  getInitialState: ->
    feedHtml:           null
    currentState:       null
    isEverythingLoaded: null

  componentDidMount: ->
    @getFeedData()

  render: ->
    switch @props.style
      when 'tlog'
        feedContent = `<FeedTlog feedHtml={ this.state.feedHtml }
                                 isLoadingNew={ this.state.currentState == PREPEND_LOADING_STATE }
                                 isLoadingPrevious={ this.state.currentState == APPEND_LOADING_STATE }
                                 onBottomNear={ this.handleBottomNear } />`
      when 'feed'
        feedContent = `<FeedBricks feedHtml={ this.state.feedHtml }
                                   isLoadingNew={ this.state.currentState == PREPEND_LOADING_STATE }
                                   isLoadingPrevious={ this.state.currentState == APPEND_LOADING_STATE }
                                   onBottomNear={ this.handleBottomNear } />`

    return feedContent

  isLoadingState: -> @state.currentState is APPEND_LOADING_STATE  ||
                     @state.currentState is PREPEND_LOADING_STATE

  getFeedData: (nextEntryId) ->
    @safeUpdateState(currentState: APPEND_LOADING_STATE)
    console.log window.location.href
    @createRequest
      # Component should be included only on feed pages like http://taaasty.ru/best
      # When you are making some changes in static, need set url value as production
      # url, i.e. http://taaasty.ru/best
      url: window.location.href
      data:
        style: @props.style
        since_entry_id: nextEntryId
      success: (feedHtml) =>
        if feedHtml is ''
          @safeUpdateState(isEverythingLoaded: true)
          return

        newFeedHtml = if @state.feedHtml? then @state.feedHtml + feedHtml else feedHtml

        @safeUpdateState(feedHtml: newFeedHtml)

        $(document).trigger 'page:change'
      error: (data) =>
        TastyNotifyController.errorResponse data
      complete: =>
        @safeUpdateState(currentState: LOADED_STATE)

  handleBottomNear: (lastItemId) ->
    if !@isLoadingState() && !@state.isEverythingLoaded
      @getFeedData lastItemId