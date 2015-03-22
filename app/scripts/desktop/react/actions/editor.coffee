EditorConstants = require('../constants/constants').editor
AppDispatcher = require '../dispatchers/dispatcher'

EditorActions =

  init: ({entry, tlogType}) ->
    AppDispatcher.handleViewAction
      type: EditorConstants.INIT
      entry: entry
      tlogType: tlogType

module.exports = EditorActions