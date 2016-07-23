_ = require 'lodash'

DesignPresenterService =

  options:
    headerFont: [
    ]
    headerSize: [
    ]
    headerColor: [
    ]
    backgroundColor: [
    ]
    feedBackgroundColor: [
    ]
    feedFont: [
    ]
    feedFontColor: [
    ]

  getTitle: (option, value) ->
    property = @getProperty option, value

    if property?.title
      if _.isFunction property.title then property.title() else property.title

  getText: (option, value) ->
    property = @getProperty option, value

    if property?.text
      if _.isFunction property.text then property.text() else property.text
    else
      @getTitle(option, value)

  getName: (option, value) ->
    property = @getProperty option, value
    return property.name if property?.name

  getProperty: (option, value) ->
    propertyAny = null

    return throw new Error("Неизвестная опция #{option}") unless @options[option]

    for property in @options[option]
      if property.value is ':ANY:' then propertyAny = property
      if property.value is value then return property

    return propertyAny if propertyAny?
    null

module.exports = DesignPresenterService
