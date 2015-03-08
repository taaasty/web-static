_ = require 'lodash'

DesignStatesService =
  page: document.body
  pageCover: document.querySelector '.page-cover'
  feed: document.querySelector '.content-area__bg'

  states:
    headerFont:          'designtlog-headerfont'
    headerSize:          'designtlog-headersize'
    headerColor:         'designtlog-headercolor'
    backgroundColor:     'designtlog-bgcolor'
    backgroundAlignment: 'designtlog-bgalignment'
    feedBackgroundColor: 'designtlog-feedbgcolor'
    feedFont:            'designtlog-feedfont'
    feedFontColor:       'designtlog-feedcolor'

  switchableStates:
    backgroundImageEnabled: 'designtlog-bgimage-none'

  classNames:
    headerFont: [
      {
        value: 'proximanova'
        className: 'proximanova'
      }
      {
        value: 'notoserif'
        className: 'notoserif'
      }
      {
        value: 'comfortaa'
        className: 'comfortaa'
      }
      {
        value: 'airbornepilot'
        className: 'airbornepilot'
      }
      {
        value: 'amaranth'
        className: 'amaranth'
      }
      {
        value: 'beermoney'
        className: 'beermoney'
      }
      {
        value: 'dancingscript'
        className: 'dancingscript'
      }
      {
        value: 'greatvibes'
        className: 'greatvibes'
      }
      {
        value: 'veles'
        className: 'veles'
      }
      {
        value: 'zion'
        className: 'zion'
      }
      {
        value: 'nautilus'
        className: 'nautilus'
      }
      {
        value: 'ospdin'
        className: 'ospdin'
      }
      {
        value: 'pecita'
        className: 'pecita'
      }
      {
        value: 'poetsen'
        className: 'poetsen'
      }
      {
        value: 'yessireebob'
        className: 'yessireebob'
      }
    ]
    headerSize: [
      {
        value: 'small'
        className: 'small'
      }
      {
        value: 'middle'
        className: 'middle'
      }
      {
        value: 'large'
        className: 'large'
      }
    ]
    headerColor: [
      {
        value: '#ffffff'
        className: 'white'
      }
      {
        value: '#000000'
        className: 'black'
      }
      {
        value: ':ANY:'
        className: 'custom'
      }
      {
        value: '#2ac67e'
        className: 'shamrock'
      }
      {
        value: '#e74c3c'
        className: 'cinnabar'
      }
      {
        value: '#6c7a89'
        className: 'bluegray'
      }
      {
        value: '#38434e'
        className: 'madison'
      }
    ]
    backgroundColor: [
      {
        value: '#ffffff'
        className: 'white'
      }
      {
        value: '#000000'
        className: 'black'
      }
      {
        value: ':ANY:'
        className: 'custom'
      }
      {
        value: '#e74c3c'
        className: 'cinnabar'
      }
      {
        value: '#c6c9cc'
        className: 'silversand'
      }
      {
        value: '#6c7a89'
        className: 'bluegray'
      }
    ]
    backgroundAlignment: [
      {
        value: 'justify'
        className: 'justify'
      }
      {
        value: 'center'
        className: 'center'
      }
    ]
    feedBackgroundColor: [
      {
        value: '#ffffff'
        className: 'white'
      }
      {
        value: '#000000'
        className: 'black'
      }
      {
        value: ':ANY:'
        className: 'custom'
      }
      {
        value: '#e74c3c'
        className: 'cinnabar'
      }
      {
        value: '#c6c9cc'
        className: 'silversand'
      }
      {
        value: '#6c7a89'
        className: 'bluegray'
      }
    ]
    feedFont: [
      {
        value: 'ptsans'
        className: 'ptsans'
      }
      {
        value: 'ptserif'
        className: 'ptserif'
      }
      {
        value: 'roboto'
        className: 'roboto'
      }
      {
        value: 'lora'
        className: 'lora'
      }
      {
        value: 'philosopher'
        className: 'philosopher'
      }
      {
        value: 'ptmono'
        className: 'ptmono'
      }
      {
        value: 'berenisadfpro'
        className: 'berenisadfpro'
      }
      {
        value: 'djserif'
        className: 'djserif'
      }
      {
        value: 'heuristica'
        className: 'heuristica'
      }
      {
        value: 'permian'
        className: 'permian'
      }
      {
        value: 'robotoslab'
        className: 'robotoslab'
      }
      {
        value: 'clearsans'
        className: 'clearsans'
      }
    ]
    feedFontColor: [
      {
        value: '#ffffff'
        className: 'white'
      }
      {
        value: '#000000'
        className: 'black'
      }
      {
        value: '#c6c9cc'
        className: 'silversand'
      }
      {
        value: '#6c7a89'
        className: 'bluegray'
      }
      {
        value: '#38434e'
        className: 'madison'
      }
    ]

  apply: (design) ->
    states = {}
    switchableStates = {}

    _.forEach design, (val, state) =>
      switch
        when @states[state] then states[state] = val
        when @switchableStates[state] then switchableStates[state] = val

    classes = @page.className.split(' ').filter (className) =>
      for k of states
        return false if className.indexOf(@states[k]) == 0

      for m of switchableStates
        return false if @switchableStates[m] is className
      true

    _.forEach states, (value, state) =>
      propertyClassName = @getPropertyClassName state, value
      newClass = @states[state] + '-' + propertyClassName
      classes.push newClass

    _.forEach switchableStates, (value, state) =>
      if value
        newClass = @switchableStates[state]
        classes.push newClass

    if design.backgroundImageUrl
      @pageCover.style.backgroundImage = 'url("' + design.backgroundImageUrl + '")'

    if _.isNumber design.feedTransparency
      # У пользователей свойство называется прозрачность, чем выше значение, тем
      # прозрачнее должен быть фон ленты. Но в стилях есть только НЕпрозрачность.
      # Конвертируем значение прозрачности в НЕпрозрачность.
      # Например:
      # .16 прозрачности == .84 НЕпрозрачности.
      opacity = 1 - design.feedTransparency
      @feed.style.opacity = opacity

    @page.className = _.trim classes.join ' '

  getPropertyClassName: (option, value) ->
    propertyAny = null

    return throw new Error("Неизвестная опция #{option}") unless @classNames[option]

    for property in @classNames[option]
      if property.value is ':ANY:' then propertyAny = property
      if property.value is value then return property.className

    return propertyAny.className if propertyAny?.className
    null

module.exports = DesignStatesService