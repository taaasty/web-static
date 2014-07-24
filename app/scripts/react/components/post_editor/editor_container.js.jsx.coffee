###* @jsx React.DOM ###
#
window.PostEditor_EditorContainer = React.createClass
  mixins:         [ReactActivitiesUser]
  propTypes:
    entry:         React.PropTypes.object.isRequired
    entryType:     React.PropTypes.string.isRequired
    onChanging:    React.PropTypes.func.isRequired

  render: ->
    if @props.entry?
      `<section className="posts posts--edit">{this.editorComponent()}</section>`
    else
      `<div>No entry to edit</div>`

  editorComponent: ->
    opts =
      ref:               'editor'
      activitiesHandler: @activitiesHandler
      entry:             @props.entry
      doneCallback:      @goToEntryPage
      onChanging:        @props.onChanging

    switch @props.entryType
      when 'text'
        editor = PostEditor_TextEditor  opts
      when 'image'
        editor = PostEditor_ImageEditor opts
      when 'video'
        editor = PostEditor_VideoEditor opts
      when 'quote'
        editor = PostEditor_QuoteEditor opts
      else
        console.error "Unknown entry type: #{@props.entryType}"

  saveEntry: -> @refs.editor.saveEntry()

  goToEntryPage: (newEntry) ->
    #@setState isGoing: true
    if window.TASTY_ENV=='development'
      alert "Статья успешно сохранена"
      window.location.reload()
    else
      #@setState isGoing: true
      _.defer =>
        # TODO Выводить модалку
        TastyNotifyController.notifySuccess 'Опубликовано! Переходим на страницу поста..'
        console.log 'goto', newEntry.entry_url
        window.location.href = newEntry.entry_url

