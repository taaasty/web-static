###* @jsx React.DOM ###

window.PostEditor_EditorContainer = React.createClass
  mixins: ['ReactActivitiesUser']

  propTypes:
    normalizedEntry: React.PropTypes.object.isRequired
    entryType:       React.PropTypes.string.isRequired
    entryPrivacy:    React.PropTypes.string.isRequired

  render: ->
    if @props.normalizedEntry?
      editorContainer = `<section className="posts posts--edit">
                           { this._getEditorComponent() }
                         </section>`
    else
      editorContainer = `<div>No entry to edit</div>`

    editorContainer

  saveEntry: ({ entryPrivacy }) ->
    @refs.editor.saveEntry { entryPrivacy }

  storeCallback: (normalizedEntry) ->
    EntryStore.storeEntry normalizedEntry

  redirectToEntryPage: (entry) ->
    if TastySettings.env is 'static-development'
      alert "Статья #{ entry.id } успешно сохранена"
      window.location.reload()
    else
      _.defer =>
        # TODO Выводить модалку
        TastyNotifyController.notifySuccess 'Опубликовано! Переходим на страницу поста..'
        console.log 'goto', entry.entry_url
        window.location.href = entry.entry_url

  _getEditorComponent: ->
    switch @props.entryType
      when 'anonymous'
        editor = @_getAnonymousEditor()
      when 'text'
        editor = @_getTextEditor()
      when 'image'
        editor = @_getImageEditor()
      when 'instagram'
        editor = @_getInstagramEditor()
      when 'music'
        editor = @_getMusicEditor()
      when 'video'
        editor = @_getVideoEditor()
      when 'quote'
        editor = @_getQuoteEditor()
      else
        console.error "Unknown entry type: #{@props.entryType}"

    editor

  _getAnonymousEditor: ->
    `<PostEditor_AnonymousEditor ref="editor"
                                 normalizedEntry={ this.props.normalizedEntry }
                                 activitiesHandler={ this.activitiesHandler }
                                 storeCallback={ this.storeCallback }
                                 doneCallback={ this.redirectToEntryPage } />`

  _getTextEditor: ->
    `<PostEditor_TextEditor ref="editor"
                            normalizedEntry={ this.props.normalizedEntry }
                            activitiesHandler={ this.activitiesHandler }
                            storeCallback={ this.storeCallback }
                            doneCallback={ this.redirectToEntryPage } />`

  _getImageEditor: ->
    `<PostEditor_ImageEditor ref="editor"
                             normalizedEntry = { this.props.normalizedEntry }
                             entryPrivacy={ this.props.entryPrivacy }
                             activitiesHandler={ this.activitiesHandler }
                             storeCallback={ this.storeCallback }
                             doneCallback={ this.redirectToEntryPage } />`

  _getInstagramEditor: ->
    `<PostEditor_InstagramEditor ref="editor"
                                 normalizedEntry = { this.props.normalizedEntry }
                                 activitiesHandler={ this.activitiesHandler }
                                 storeCallback={ this.storeCallback }
                                 doneCallback={ this.redirectToEntryPage } />`

  _getMusicEditor: ->
    `<PostEditor_MusicEditor ref="editor"
                             normalizedEntry = { this.props.normalizedEntry }
                             activitiesHandler={ this.activitiesHandler }
                             storeCallback={ this.storeCallback }
                             doneCallback={ this.redirectToEntryPage } />`

  _getVideoEditor: ->
    `<PostEditor_VideoEditor ref="editor"
                             normalizedEntry = { this.props.normalizedEntry }
                             activitiesHandler={ this.activitiesHandler }
                             storeCallback={ this.storeCallback }
                             doneCallback={ this.redirectToEntryPage } />`

  _getQuoteEditor: ->
    `<PostEditor_QuoteEditor ref="editor"
                             normalizedEntry = { this.props.normalizedEntry }
                             activitiesHandler={ this.activitiesHandler }
                             storeCallback={ this.storeCallback }
                             doneCallback={ this.redirectToEntryPage } />`
