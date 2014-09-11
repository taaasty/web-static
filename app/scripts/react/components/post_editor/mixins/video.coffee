window.PostEditor_VideoMixin =
  propTypes:
    normalizedEntry:   React.PropTypes.instanceOf(NormalizedEntry).isRequired

  getInitialState: ->
    embedUrl:  @props.normalizedEntry.embedUrl
    embedHtml: @props.normalizedEntry.embedHtml
    title:     @props.normalizedEntry.data2

  entryType: -> 'video'

  successLoaded: (iframely) ->
    @setState {
      embedUrl:  iframely.url
      embedHtml: iframely.html
      title:     iframely.meta.description || iframely.meta.title
    }

  _getNormalizedData: ->
    data2:     @refs.titleEditor.content()
    embedHtml: @state.embedHtml
    embedUrl:  @state.embedUrl

  # Используется в ключе data, ajax-запроса
  _getEditorData: ->
    title:     @refs.titleEditor.content()
    video_url: @state.embedUrl

  handleDeleteEmbeded: ->
    @setState {
      embedUrl:  null
      embedHtml: null
      title:     ''
    }
