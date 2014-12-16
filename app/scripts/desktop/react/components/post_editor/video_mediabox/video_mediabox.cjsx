WELCOME_MODE = 'welcome'
EMBEDED_MODE = 'embeded'
INSERT_MODE  = 'insert'
LOADING_MODE = 'loading'

window.VideoMediaBox = React.createClass
  mixins: ['ReactActivitiesUser', RequesterMixin, ComponentManipulationsMixin]

  propTypes:
    embedUrl:        React.PropTypes.string
    embedHtml:       React.PropTypes.string
    onDeleteEmbeded: React.PropTypes.func.isRequired
    onSuccessLoad:   React.PropTypes.func.isRequired

  getInitialState: ->
    currentState: @_getInitialCurrentState()
    embedUrl:     @props.embedUrl
    embedHtml:    @props.embedHtml

  render: ->
    switch @state.currentState
      when WELCOME_MODE
        children = React.Children.map @props.children, (child) =>
          React.addons.cloneWithProps child, {
            onClick: @activateInsertMode
          }

        mediaBox = <div>{ children }</div>

      when EMBEDED_MODE
        mediaBox = <VideoMediaBox_Embeded embedHtml={ this.state.embedHtml }
                                          onDelete={ this.handleDelete } />

      when INSERT_MODE
        mediaBox = <VideoMediaBox_UrlInsert ref="insert"
                                            embedUrl={ this.state.embedUrl }
                                            onExit={ this.activateWelcomeMode }
                                            onChange={ this.loadEmbed } />

      when LOADING_MODE
        mediaBox = <VideoMediaBox_Loading embedUrl={ this.state.embedUrl } />

      else console.error 'Неизвестный тип currentState', @state.currentState

    mediaBox

  loadEmbed: (embedUrl) ->
    @setState {
      embedUrl:  embedUrl
      embedHtml: null
    }

    @activateLoadingMode()
    @incrementActivities()

    @createRequest
      url: ApiRoutes.iframely_url()
      method: 'POST'
      data:
        url: embedUrl
      success: (iframely) =>
        @safeUpdateState {
          embedUrl:  iframely.url
          embedHtml: iframely.html
        }

        @activateEmbededMode()
        @props.onSuccessLoad iframely
      error: (response) =>
        TastyNotifyController.errorResponse response
        @safeUpdateState @getInitialState()
      complete: =>
        @decrementActivities()

  activateWelcomeMode: -> @setState currentState: WELCOME_MODE
  activateEmbededMode: -> @setState currentState: EMBEDED_MODE
  activateLoadingMode: -> @setState currentState: LOADING_MODE
  activateInsertMode:  -> @setState currentState: INSERT_MODE

  isWelcomeMode: -> @state.currentState is WELCOME_MODE
  isEmbededMode: -> @state.currentState is EMBEDED_MODE
  isLoadingMode: -> @state.currentState is LOADING_MODE
  isInsertMode:  -> @state.currentState is INSERT_MODE

  _getInitialCurrentState: ->
    # Возможные варианты currentState: welcome, embeded, insert, loading

    if @props.embedHtml? then EMBEDED_MODE else WELCOME_MODE

  handleDelete: ->
    @activateWelcomeMode()

    @setState {
      embedUrl:  null
      embedHtml: null
    }

    @props.onDeleteEmbeded()