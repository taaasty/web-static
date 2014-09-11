###* @jsx React.DOM ###

window.PostEditor_VideoEditor = React.createClass
  mixins: ['PostEditor_PersistenceMixin', 'ReactActivitiesUser', PostEditor_AutosaveMixin]

  propTypes:
    embedUrl:   React.PropTypes.string
    embedHtml:  React.PropTypes.string
    entryTitle: React.PropTypes.string

  getInitialState: ->
    embedUrl:  @props.embedUrl
    embedHtml: @props.embedHtml
    title:     @props.entryTitle

  render: ->
    videoEditorClasses = React.addons.classSet {
      'post':        true
      'post--video': true
      'post--edit':  true
      'state--loading': @hasActivities()
    }

    return `<article className={ videoEditorClasses }>
              <div className="post__content">
                <VideoMediaBox embedUrl={ this.state.embedUrl }
                               embedHtml={ this.state.embedHtml }
                               activitiesHandler={ this.activitiesHandler }
                               onDeleteEmbeded={ this.handleDeleteEmbeded }
                               onSuccessLoad={ this.successLoaded }>
                  <MediaBox_VideoWelcome />
                </VideoMediaBox>
                <TastyEditor ref="titleEditor"
                             placeholder="Придумайте подпись"
                             mode="partial"
                             content={ this.state.title }
                             isLoading={ this.hasActivities() }
                             onChange={ this.startAutosave } />
              </div>
            </article>`

  storeEntry: ->
    EntryStoreService.storeEntry @props.entryId, @props.entryUpdatedAt, @_getNormalizedData()

  successLoaded: (iframely) ->
    @setState {
      embedUrl:  iframely.url
      embedHtml: iframely.html
      title:     iframely.meta.description || iframely.meta.title
    }

  _getNormalizedData: ->
    # Используется при сохранении данных в EntryStoreService
    return {
      title:     @refs.titleEditor.content()
      embedHtml: @state.embedHtml
      videoUrl:  @state.embedUrl
    }

  _getEditorData: ->
    # Используется в ключе data, ajax-запроса
    return {
      title:     @refs.titleEditor.content()
      video_url: @state.embedUrl
    }

  handleDeleteEmbeded: ->
    @setState {
      embedUrl:  null
      embedHtml: null
      title:     ''
    }

  handleChange: -> @storeEntry()