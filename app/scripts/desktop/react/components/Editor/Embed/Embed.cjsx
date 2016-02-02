EditorActionCreators = require '../../../actions/editor'
EditorEmbedUrlInsert = require './EmbedUrlInsert'
EditorEmbedLoading = require './EmbedLoading'
EditorEmbedLoaded = require './EmbedLoaded'
{ PropTypes } = React

INSERT_STATE = 'insert'
LOADED_STATE = 'loaded'
WELCOME_STATE = 'welcome'
LOADING_STATE = 'loading'

EditorEmbed = React.createClass
  displayName: 'EditorEmbed'

  propTypes:
    embedUrl: PropTypes.string
    embedHtml: PropTypes.string
    loading: React.PropTypes.bool.isRequired
    onCreate: PropTypes.func.isRequired
    onChaneEmbedUrl: PropTypes.func.isRequired
    onDelete: PropTypes.func.isRequired
    children: PropTypes.oneOfType([
      PropTypes.element, PropTypes.array
    ]).isRequired

  getInitialState: ->
    currentState: @getInitialCurrentState()

  render: ->
    switch @state.currentState
      when WELCOME_STATE
        children = React.Children.map @props.children, (child) =>
          React.cloneElement child, onClickInsertState: @activateInsertState

        <div>{ children }</div>
      when LOADED_STATE
        <EditorEmbedLoaded
            embedHtml={ @props.embedHtml }
            loading={@props.loading}
            onDelete={ @handleDeleteEmbed } />
      when INSERT_STATE
        <EditorEmbedUrlInsert
            onInsert={ @handleChangeEmbedUrl }
            onCancel={ @activateWelcomeState } />
      when LOADING_STATE
        <EditorEmbedLoading embedUrl={ @props.embedUrl } />
      else null

  activateLoadedState: -> @setState currentState: LOADED_STATE
  activateInsertState: -> @setState currentState: INSERT_STATE
  activateWelcomeState: -> @setState currentState: WELCOME_STATE
  activateLoadingState: -> @setState currentState: LOADING_STATE

  getInitialCurrentState: ->
    if @props.embedHtml then LOADED_STATE else WELCOME_STATE

  handleChangeEmbedUrl: (embedUrl) ->
    @props.onChaneEmbedUrl embedUrl

    @activateLoadingState()

    EditorActionCreators.createEmbed embedUrl
      .then (iframely) =>
        @props.onCreate
          title: iframely.meta?.description || iframely.meta?.title
          embedHtml: iframely.html

        @activateLoadedState()
      .fail @activateInsertState

  handleDeleteEmbed: ->
    @activateWelcomeState()
    @props.onDelete()

module.exports = EditorEmbed