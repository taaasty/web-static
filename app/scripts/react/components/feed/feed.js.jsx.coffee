###* @jsx React.DOM ###

APPEND_LOADING_STATE  = 'appendLoading'
PREPEND_LOADING_STATE = 'prependLoading'
LOADED_STATE          = 'loaded'
THRESHOLD             = 200

window.Feed = React.createClass
  mixins: [RequesterMixin, ComponentManipulationsMixin]

  propTypes:
    style: React.PropTypes.string.isRequired

  getDefaultProps: ->
    style: 'tlog'

  getInitialState: ->
    feedHtml: null
    currentState: null

  componentDidMount: ->
    @getFeedData()

    $(window).on 'scroll', @handleScroll

  componentWillUnmount: ->
    $(window).off 'scroll', @handleScroll

  render: ->
    switch @state.currentState
      when PREPEND_LOADING_STATE
        spinnerBefore = `<div className="page-loader"><Spinner size={ 24 } /></div>`
      when APPEND_LOADING_STATE
        spinnerAfter = `<div className="page-loader"><Spinner size={ 24 } /></div>`

    switch @props.style
      when 'tlog'
        feedContent = `<div className="content-area">
                         <div className="content-area__bg" />
                         <div className="content-area__inner">
                           { spinnerBefore }
                           <section className="posts">
                             { this.state.feedHtml }
                           </section>
                           { spinnerAfter }
                         </div>
                       </div>`
      when 'feed'
        feedContent = `<div className="bricks-wrapper">
                         { spinnerBefore }
                         <section ref="container"
                                  className="bricks"
                                  onScroll={ this.handleScroll }
                                  dangerouslySetInnerHTML={{__html: this.state.feedHtml}}>
                         </section>
                         { spinnerAfter }
                       </div>`

    return feedContent

  isLoadingState: -> @state.currentState is APPEND_LOADING_STATE ||
                     @state.currentState is PREPEND_LOADING_STATE

  getFeedData: (nextEntryId) ->
    console.info 'Getting feed data', nextEntryId

    @safeUpdateState(currentState: APPEND_LOADING_STATE)

    @createRequest
      # Component should be included only on feed pages like http://taaasty.ru/best
      # When you are making some changes in static, need set url value as production
      # url, i.e. http://taaasty.ru/best
      url: window.location.href
      data:
        style:          @props.style
        since_entry_id: nextEntryId
      success: (feedHtml) =>
        newFeedHtml = if @state.feedHtml? then @state.feedHtml + feedHtml else feedHtml

        @safeUpdateState(feedHtml: newFeedHtml)

        @initGridManager() if @props.style is 'feed'
        $(document).trigger 'page:change'
      error: (data) =>
        TastyNotifyController.errorResponse data
      complete: =>
        @safeUpdateState(currentState: LOADED_STATE)

  getLastItemId: ->
    $container = $( @refs.container.getDOMNode() )

    $container.children().last().data 'id'

  initGridManager: ->
    $container = $( @refs.container.getDOMNode() )

    $container.shapeshift {
      selector: '.brick'
      enableDrag: false
      enableCrossDrop: false
      gutterX: 10
      gutterY: 10
      paddingX: 0
      paddingY: 0
    }

  handleScroll: ->
    isNearBottom = $(window).scrollTop() + $(window).height() > $(document).height() - THRESHOLD

    if isNearBottom
      unless @isLoadingState()
        lastItemId = @getLastItemId()

        @getFeedData lastItemId