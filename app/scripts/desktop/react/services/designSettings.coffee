FreeDesignStorage = require '../storages/freeDesign'

DesignSettingsService =

  hasPaidValues: (design) ->
    for key, val of design
      continue unless FreeDesignStorage[key]
      continue if FreeDesignStorage[key] is ':ANY:'
      return true if FreeDesignStorage[key].indexOf(val) == -1
    false

  isPaidValue: (option, value) ->
    return throw new Error("Неизвестная опция #{option}") unless FreeDesignStorage[option]
    return true if FreeDesignStorage[option] is ':ANY:'
    return true for val in FreeDesignStorage[option] when val is value
    false

module.exports = DesignSettingsService