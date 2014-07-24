window.PostEditor_LayoutMixin =
  goToEntryPage: (newEntry) ->
    if window.TASTY_ENV=='development'
      alert "Статья успешно сохранена"
      window.location.reload()
    else
      @setState isGoing: true
      _.defer =>
        TastyNotifyController.notifySuccess 'Опубликовано! Переходим на страницу поста..'
        console.log 'goto', newEntry.entry_url
        window.location.href = newEntry.entry_url

  editorComponent: ->
    opts =
      ref:               'editor'
      entry:             @state.entry
      activitiesHandler: @activitiesHandler
      doneCallback:      @goToEntryPage

    switch @state.entry.type
      when 'text'
        editor = PostEditor_TextEditor  opts
      when 'image'
        editor = PostEditor_ImageEditor opts
      when 'video'
        editor = PostEditor_VideoEditor opts
      when 'quote'
        editor = PostEditor_QuoteEditor opts
      else
        console.error "Unknown entry type: #{@state.entry.type}"

  changePrivacy: (value)->
    entry = @state.entry
    entry.privacy = value
    @setState entry: entry

  togglePreview: ->
    @setState previewMode: !@state.previewMode

