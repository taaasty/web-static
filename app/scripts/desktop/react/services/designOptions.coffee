CurrentUserStore = require '../stores/current_user'
DesignFreeOptions = require '../models/designFreeOptions'

DesignOptionsService =
  hasPaidValues: (design) ->
    for key, val of design
      continue unless DesignFreeOptions[key]
      continue if DesignFreeOptions[key] is ':ANY:'
      return true if DesignFreeOptions[key].indexOf(val) == -1
    false

  isPaidValue: (option, value) ->
    return throw new Error("Неизвестная опция #{option}") unless DesignFreeOptions[option]
    return false if DesignFreeOptions[option] is ':ANY:'
    return false for val in DesignFreeOptions[option] when val is value
    true

  isBoughtValue: (option, value) ->
    # Позже здесь будут более сложные условия, по которым мы будем определять
    # куплена опция или нет. Пока, проверяем по наличию поля в currentUser
    CurrentUserStore.hasDesignBundle()

module.exports = DesignOptionsService