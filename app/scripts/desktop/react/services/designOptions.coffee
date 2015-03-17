CurrentUserStore = require '../stores/current_user'
FreeDesignOptionsModel = require '../models/freeDesignOptions'

DesignOptionsService =
  hasPaidValues: (design) ->
    for key, val of design
      continue unless FreeDesignOptionsModel[key]
      continue if FreeDesignOptionsModel[key] is ':ANY:'
      return true if FreeDesignOptionsModel[key].indexOf(val) == -1
    false

  isPaidValue: (option, value) ->
    return throw new Error("Неизвестная опция #{option}") unless FreeDesignOptionsModel[option]
    return false if FreeDesignOptionsModel[option] is ':ANY:'
    return false for val in FreeDesignOptionsModel[option] when val is value
    true

  isBoughtValue: (option, value) ->
    # Позже здесь будут более сложные условия, по которым мы будем определять
    # куплена опция или нет. Пока, проверяем по наличию поля в currentUser
    CurrentUserStore.hasDesignBundle()

module.exports = DesignOptionsService