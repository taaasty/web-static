AUTOSAVE_TIME = 10000

window.PostEditor_AutosaveMixin =
  propTypes:
    storeCallback:         React.PropTypes.func.isRequired

  componentWillUnmount: ->
    @storeEntry() if @autoSaveTimer?
    @stopAutosave()

  handleChange: -> @storeEntry()

  startAutosave: ->
    @stopAutosave() if @autoSaveTimer?

    @autoSaveTimer = setTimeout @storeEntry, AUTOSAVE_TIME

  _getNormalizedEntry: ->
    _.extend @props.normalizedEntry, @_getNormalizedData()

  storeEntry: ->
    @props.storeCallback @_getNormalizedEntry()

  stopAutosave: ->
    clearTimeout(@autoSaveTimer) if @autoSaveTimer?
