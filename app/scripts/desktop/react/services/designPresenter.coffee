_ = require 'lodash'

DesignPresenterService =

  options:
    headerFont: [
      {
        value: 'proximanova'
        name: 'proximanova'
        title: 'Proxima Nova'
        text: 'Aa'
      }
      {
        value: 'notoserif'
        name: 'notoserif'
        title: 'Noto Serif'
        text: 'Aa'
      }
      {
        value: 'comfortaa'
        name: 'comfortaa'
        title: 'Comfortaa'
        text: 'Aa'
      }
      {
        value: 'airbornepilot'
        name: 'airbornepilot'
        title: 'Airborne Pilot'
        text: 'Aa'
      }
      {
        value: 'amaranth'
        name: 'amaranth'
        title: 'Amaranth'
        text: 'Aa'
      }
      {
        value: 'beermoney'
        name: 'beermoney'
        title: 'Beer Money'
        text: 'Aa'
      }
      {
        value: 'dancingscript'
        name: 'dancingscript'
        title: 'Dancing Script'
        text: 'Aa'
      }
      {
        value: 'greatvibes'
        name: 'greatvibes'
        title: 'Great Vibes'
        text: 'Aa'
      }
      {
        value: 'veles'
        name: 'veles'
        title: 'Veles'
        text: 'Aa'
      }
      {
        value: 'zion'
        name: 'zion'
        title: 'ZionTrain'
        text: 'Aa'
      }
      {
        value: 'nautilus'
        name: 'nautilus'
        title: 'Nautilus Pompilius'
        text: 'Aa'
      }
      {
        value: 'ospdin'
        name: 'ospdin'
        title: 'OSP-DIN'
        text: 'Aa'
      }
      {
        value: 'pecita'
        name: 'pecita'
        title: 'Pecita'
        text: 'Aa'
      }
      {
        value: 'poetsen'
        name: 'poetsen'
        title: 'PoetsenOne'
        text: 'Aa'
      }
      {
        value: 'yessireebob'
        name: 'yessireebob'
        title: 'Yes Siree Bob'
        text: 'Aa'
      }
    ]
    headerSize: [
      {
        value: 'small'
        name: 'small'
        text: -> i18n.t('design_header_size_small')
      }
      {
        value: 'middle'
        name: 'middle'
        text: -> i18n.t('design_header_size_medium')
      }
      {
        value: 'large'
        name: 'large'
        text: -> i18n.t('design_header_size_large')
      }
    ]
    headerColor: [
      {
        value: '#ffffff'
        name: 'white'
        title: -> i18n.t('design_colors_white')
      }
      {
        value: '#000000'
        name: 'black'
        title: -> i18n.t('design_colors_black')
      }
      {
        value: ':ANY:'
        name: 'custom'
        title: -> i18n.t('design_colors_custom')
      }
      {
        value: '#2ac67e'
        name: 'shamrock'
        title: -> i18n.t('design_colors_shamrock')
      }
      {
        value: '#e74c3c'
        name: 'cinnabar'
        title: -> i18n.t('design_colors_cinnabar')
      }
      {
        value: '#6c7a89'
        name: 'bluegray'
        title: -> i18n.t('design_colors_bluegray')
      }
      {
        value: '#38434e'
        name: 'madison'
        title: -> i18n.t('design_colors_madison')
      }
    ]
    backgroundColor: [
      {
        value: '#ffffff'
        name: 'white'
        title: -> i18n.t('design_colors_white')
      }
      {
        value: '#000000'
        name: 'black'
        title: -> i18n.t('design_colors_black')
      }
      {
        value: ':ANY:'
        name: 'custom'
        title: -> i18n.t('design_colors_custom')
      }
      {
        value: '#e74c3c'
        name: 'cinnabar'
        title: -> i18n.t('design_colors_cinnabar')
      }
      {
        value: '#c6c9cc'
        name: 'silversand'
        title: -> i18n.t('design_colors_silversand')
      }
      {
        value: '#6c7a89'
        name: 'bluegray'
        title: -> i18n.t('design_colors_bluegray')
      }
    ]
    backgroundAlignment: [
      {
        value: 'justify'
        name: 'justify'
        text: -> i18n.t('design_background_alignment_justify')
      }
      {
        value: 'center'
        name: 'center'
        text: -> i18n.t('design_background_alignment_center')
      }
    ]
    feedBackgroundColor: [
      {
        value: '#ffffff'
        name: 'white'
        title: -> i18n.t('design_colors_white')
      }
      {
        value: '#000000'
        name: 'black'
        title: -> i18n.t('design_colors_black')
      }
      {
        value: ':ANY:'
        name: 'custom'
        title: -> i18n.t('design_colors_custom')
      }
      {
        value: '#e74c3c'
        name: 'cinnabar'
        title: -> i18n.t('design_colors_cinnabar')
      }
      {
        value: '#c6c9cc'
        name: 'silversand'
        title: -> i18n.t('design_colors_silversand')
      }
      {
        value: '#6c7a89'
        name: 'bluegray'
        title: -> i18n.t('design_colors_bluegray')
      }
    ]
    feedFont: [
      {
        value: 'ptsans'
        name: 'ptsans'
        title: 'PT Sans'
        text: 'Aa'
      }
      {
        value: 'ptserif'
        name: 'ptserif'
        title: 'PT Serif'
        text: 'Aa'
      }
      {
        value: 'roboto'
        name: 'roboto'
        title: 'Roboto'
        text: 'Aa'
      }
      {
        value: 'lora'
        name: 'lora'
        title: 'Lora'
        text: 'Aa'
      }
      {
        value: 'philosopher'
        name: 'philosopher'
        title: 'Philosopher'
        text: 'Aa'
      }
      {
        value: 'ptmono'
        name: 'ptmono'
        title: 'PT Mono'
        text: 'Aa'
      }
      {
        value: 'berenisadfpro'
        name: 'berenisadfpro'
        title: 'Berenis ADF Pro'
        text: 'Aa'
      }
      {
        value: 'djserif'
        name: 'djserif'
        title: 'DejaVu Serif Condensed'
        text: 'Aa'
      }
      {
        value: 'heuristica'
        name: 'heuristica'
        title: 'Heuristica'
        text: 'Aa'
      }
      {
        value: 'permian'
        name: 'permian'
        title: 'Permian Slab Serif'
        text: 'Aa'
      }
      {
        value: 'robotoslab'
        name: 'robotoslab'
        title: 'Roboto Slab'
        text: 'Aa'
      }
      {
        value: 'clearsans'
        name: 'clearsans'
        title: 'Clear Sans'
        text: 'Aa'
      }
    ]
    feedFontColor: [
      {
        value: '#ffffff'
        name: 'white'
        title: -> i18n.t('design_colors_white')
      }
      {
        value: '#000000'
        name: 'black'
        title: -> i18n.t('design_colors_black')
      }
      {
        value: '#c6c9cc'
        name: 'silversand'
        title: -> i18n.t('design_colors_silversand')
      }
      {
        value: '#6c7a89'
        name: 'bluegray'
        title: -> i18n.t('design_colors_bluegray')
      }
      {
        value: '#38434e'
        name: 'madison'
        title: -> i18n.t('design_colors_madison')
      }
      {
        value: ':ANY:'
        name: 'custom'
        title: -> i18n.t('design_colors_custom')
      }
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