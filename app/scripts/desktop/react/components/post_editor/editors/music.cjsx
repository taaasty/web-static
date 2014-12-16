window.PostEditor_MusicEditor = React.createClass
  mixins: ['PostEditor_PersistenceMixin', 'ReactActivitiesUser', PostEditor_AutosaveMixin
            PostEditor_VideoMixin]

  render: ->
    musicEditorClasses = React.addons.classSet {
      'post':        true
      'post--video': true
      'post--edit':  true
      'state--loading': @hasActivities()
    }

    return <article className={ musicEditorClasses }>
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
                            isLoading={ this.hasActivities() }
                            onChange={ this.startAutosave } />
             </div>
           </article>