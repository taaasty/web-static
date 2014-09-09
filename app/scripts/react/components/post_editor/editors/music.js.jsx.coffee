###* @jsx React.DOM ###

window.PostEditor_MusicEditor = React.createClass
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
    musicEditorClasses = React.addons.classSet {
      'post':        true
      'post--video': true
      'post--edit':  true
      'state--loading': @hasActivities()
    }

    return `<article className={ musicEditorClasses }>
              <div className="post__content">
                <VideoMediaBox embedUrl={ this.state.embedUrl }
                               embedHtml={ this.state.embedHtml }
                               activitiesHandler={ this.activitiesHandler }
                               onDeleteEmbeded={ this.handleDeleteEmbeded }
                               onSuccessLoad={ this.successLoaded }>
                  <MediaBox_MusicWelcome />
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

  handleDeleteEmbeded: ->
    @setState {
      embedUrl:  null
      embedHtml: null
      title:     ''
    }

  _getEditorData: ->
    title:     @refs.titleEditor.content()
    video_url: @state.embedUrl