###* @jsx React.DOM ###

window.PostEditor_InstagramEditor = React.createClass
  mixins: ['PostEditor_PersistenceMixin', 'ReactActivitiesUser']

  propTypes:
    embedUrl:   React.PropTypes.string
    embedHtml:  React.PropTypes.string
    entryTitle: React.PropTypes.string

  getInitialState: ->
    embedUrl:  @props.embedUrl
    embedHtml: @props.embedHtml
    title:     @props.entryTitle

  render: ->
    instagramEditorClasses = React.addons.classSet {
      'post':        true
      'post--video': true
      'post--edit':  true
      'state--loading': @hasActivities()
    }

    return `<article className={ instagramEditorClasses }>
              <div className="post__content">
                <VideoMediaBox embedUrl={ this.state.embedUrl }
                               embedHtml={ this.state.embedHtml }
                               activitiesHandler={ this.activitiesHandler }
                               onDeleteEmbeded={ this.handleDeleteEmbeded }
                               onSuccessLoad={ this.successLoaded }>
                  <MediaBox_InstagramWelcome />
                </VideoMediaBox>
                <TastyEditor ref="titleEditor"
                             placeholder="Придумайте подпись"
                             mode="partial"
                             content={ this.state.title }
                             isLoading={ this.hasActivities() } />
              </div>
            </article>`

  successLoaded: (iframely) ->
    @setState {
      embedUrl:  iframely.url
      embedHtml: iframely.html
      title:     iframely.meta.description || iframely.meta.title
    }

  storeEntry: ->
    EntryStoreService.storeEntry @_getNormalizedData()

  _getNormalizedData: ->
    # Используется при сохранении данных в EntryStoreService
    return {
      type:      'instagram'
      title:     @refs.titleEditor.content()
      embedHtml: @state.embedHtml
      video_url: @state.embedUrl
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