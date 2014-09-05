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
    @refs.editor.saveEntry entryPrivacy: entryPrivacy

  goToEntryPage: (newEntry) ->
    if window.TASTY_ENV == 'development'
      alert "Статья #{ newEntry.id } успешно сохранена"
      window.location.reload()
    else
      _.defer =>
        # TODO Выводить модалку
        TastyNotifyController.notifySuccess 'Опубликовано! Переходим на страницу поста..'
        console.log 'goto', newEntry.entry_url
        window.location.href = newEntry.entry_url

  _getEditorComponent: ->
    opts =
      ref:               'editor'
      entry:             @props.entry
      entryPrivacy:      @props.entryPrivacy
      activitiesHandler: @activitiesHandler
      doneCallback:      @goToEntryPage

    switch @props.entryType
      when 'anonymous'
        editor = PostEditor_TextEditor  opts
      when 'text'
        editor = PostEditor_TextEditor  opts
      when 'image'
        editor = PostEditor_ImageEditor opts
      when 'instagram'
        editor = PostEditor_InstagramEditor opts
      when 'music'
        editor = PostEditor_MusicEditor opts
      when 'video'
        editor = PostEditor_VideoEditor opts
      when 'quote'
        editor = PostEditor_QuoteEditor opts
      else
        console.error "Unknown entry type: #{@props.entryType}"