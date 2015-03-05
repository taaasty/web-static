DesignSettingsService =

  hasPaidValues: (design, freeDesign) ->
    for key, val of design
      continue unless freeDesign[key]
      continue if freeDesign[key] is ':ANY:'
      return true if freeDesign[key].indexOf(val) == -1
    false

  isPaidValue: (option, value, freeDesign) ->
    return throw new Error("Неизвестная опция #{option}") unless freeDesign[option]
    return true if freeDesign[option] is ':ANY:'
    return true for val in freeDesign[option] when val is value
    false

module.exports = DesignSettingsService