###* @jsx React.DOM ###

STATE_WELCOME = 'welcome'
STATE_EMBEDED = 'embeded'
STATE_INSERT  = 'insert'
STATE_LOADING  = 'loading'

window.VideoMediaBox = React.createClass
  mixins: [RequesterMixin]

  propTypes:
    onSuccessLoad: React.PropTypes.func.isRequired
    embedUrl:  React.PropTypes.string
    embedHtml: React.PropTypes.string

  getInitialState: ->
    embedUrl:  @props.embedUrl
    embedHtml: @props.embedHtml
    current:   @_defaultState()

  componendWillUnmount: ->
    @abortActiveRequests()

  render: ->
    switch @state.current
      when STATE_WELCOME
        return VideoMediaBox_Welcome onClick: => @setState current: STATE_INSERT
      when STATE_EMBEDED
        return VideoMediaBox_Embeded embedHtml: @state.embedHtml, onDelete: @cleanEmbed
      when STATE_INSERT
        return VideoMediaBox_Insert ref: 'insert', embedUrl: @state.embedUrl, onClean: @exitFromInserting, onInsert: @loadEmbed
      when STATE_LOADING
        return VideoMediaBox_Loading embedUrl: @state.embedUrl
      else
        console.error? "Unknown state:", @state.current

  loadEmbed: (embedUrl) ->
    @setState embedUrl: embedUrl, embedHtml: null, current: STATE_LOADING

    @createRequest
      url: Routes.api.iframely_url()
      method: 'POST'
      data:
        url: embedUrl
      success: (iframely) =>
        @safeUpdateState =>
          @props.onSuccessLoad iframely
          @setState embedUrl: iframely.url, embedHtml: iframely.html, current: STATE_EMBEDED
      error: (response) =>
        TastyNotifyController.errorResponse response
        @safeUpdateState => @setState @getInitialState()


  cleanEmbed: ->
    @setState current: STATE_WELCOME, embedUrl: null, embedHtml: null

  exitFromInserting: ->
    @setState current: STATE_WELCOME

  _defaultState: ->
    if @props.videoUrl?
      STATE_WELCOME
    else
      STATE_EMBEDED

