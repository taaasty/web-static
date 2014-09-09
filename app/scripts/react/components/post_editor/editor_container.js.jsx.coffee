###* @jsx React.DOM ###

window.PostEditor_EditorContainer = React.createClass
  mixins: ['ReactActivitiesUser']

  propTypes:
    entry:        React.PropTypes.object.isRequired
    entryType:    React.PropTypes.string.isRequired
    entryPrivacy: React.PropTypes.string.isRequired

  render: ->
    if @props.entry?
      editorContainer = `<section className="posts posts--edit">
                           { this._getEditorComponent() }
                         </section>`
    else
      editorContainer = `<div>No entry to edit</div>`

    editorContainer

  saveEntry: ({ entryPrivacy }) ->
    @refs.editor.saveEntry { entryPrivacy }

  redirectToEntryPage: (entry) ->
    if window.TASTY_ENV == 'development'
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
        editor = @_getTextEditor()
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

  _getTextEditor: ->
    `<PostEditor_TextEditor ref="editor"
                            entryId={ this.props.entry.id }
                            entryType={ this.props.entryType }
                            entryTitle={ this.props.entry.title }
                            entryText={ this.props.entry.text }
                            activitiesHandler={ this.activitiesHandler }
                            doneCallback={ this.redirectToEntryPage } />`

  _getImageEditor: ->
    `<PostEditor_ImageEditor ref="editor"
                             entryId={ this.props.entry.id }
                             entryType={ this.props.entryType }
                             entryTitle={ this.props.entry.title }
                             entryImageUrl={ this.props.entry.image_url }
                             entryImageAttachments={ this.props.entry.image_attachments }
                             entryPrivacy={ this.props.entryPrivacy }
                             activitiesHandler={ this.activitiesHandler }
                             doneCallback={ this.redirectToEntryPage } />`

  _getInstagramEditor: ->
    embedHtml = @props.entry.embedHtml

    return `<PostEditor_InstagramEditor ref="editor"
                                        entryId={ this.props.entry.id }
                                        entryType="video"
                                        entryTitle={ this.props.entry.title }
                                        embedUrl={ this.props.entry.video_url }
                                        embedHtml={ embedHtml }
                                        activitiesHandler={ this.activitiesHandler }
                                        doneCallback={ this.redirectToEntryPage } />`

  _getMusicEditor: ->
    embedHtml = @props.entry.embedHtml

    return `<PostEditor_MusicEditor ref="editor"
                                    entryId={ this.props.entry.id }
                                    entryType="video"
                                    entryTitle={ this.props.entry.title }
                                    embedUrl={ this.props.entry.video_url }
                                    embedHtml={ embedHtml }
                                    activitiesHandler={ this.activitiesHandler }
                                    doneCallback={ this.redirectToEntryPage } />`

  _getVideoEditor: ->
    embedHtml = @props.entry.embedHtml

    return `<PostEditor_VideoEditor ref="editor"
                                    entryId={ this.props.entry.id }
                                    entryType="video"
                                    entryTitle={ this.props.entry.title }
                                    embedUrl={ this.props.entry.video_url }
                                    embedHtml={ embedHtml }
                                    activitiesHandler={ this.activitiesHandler }
                                    doneCallback={ this.redirectToEntryPage } />`

  _getQuoteEditor: ->
    `<PostEditor_QuoteEditor ref="editor"
                             entryId={ this.props.entry.id }
                             entryType={ this.props.entryType }
                             entryText={ this.props.entry.text }
                             entrySource={ this.props.entry.source }
                             activitiesHandler={ this.activitiesHandler }
                             doneCallback={ this.redirectToEntryPage } />`