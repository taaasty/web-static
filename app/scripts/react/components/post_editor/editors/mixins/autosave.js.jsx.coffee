AUTOSAVE_TIME = 10000

window.PostEditor_AutosaveMixin =

  componentWillUnmount: -> @stopAutosave()

  startAutosave: ->
    @stopAutosave() if @autoSaveTimer?

    @autoSaveTimer = setTimeout @storeEntry, AUTOSAVE_TIME

  stopAutosave: ->
    clearTimeout(@autoSaveTimer) if @autoSaveTimer?