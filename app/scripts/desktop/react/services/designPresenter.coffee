DesignPresenterService =

  options:
    headerFont: [
      {
        value: 'proximanova'
        title: 'Proxima Nova'
        text: 'Aa'
      }
      {
        value: 'notoserif'
        title: 'Noto Serif'
        text: 'Aa'
      }
      {
        value: 'comfortaa'
        title: 'Comfortaa'
        text: 'Aa'
      }
      {
        value: 'airbornepilot'
        title: 'Airborne Pilot'
        text: 'Aa'
      }
      {
        value: 'amaranth'
        title: 'Amaranth'
        text: 'Aa'
      }
      {
        value: 'beermoney'
        title: 'Beer Money'
        text: 'Aa'
      }
      {
        value: 'dancingscript'
        title: 'Dancing Script'
        text: 'Aa'
      }
      {
        value: 'greatvibes'
        title: 'Great Vibes'
        text: 'Aa'
      }
      {
        value: 'veles'
        title: 'Veles'
        text: 'Aa'
      }
      {
        value: 'zion'
        title: 'ZionTrain'
        text: 'Aa'
      }
      {
        value: 'nautilus'
        title: 'Nautilus Pompilius'
        text: 'Aa'
      }
      {
        value: 'ospdin'
        title: 'OSP-DIN'
        text: 'Aa'
      }
      {
        value: 'pecita'
        title: 'Pecita'
        text: 'Aa'
      }
      {
        value: 'poetsen'
        title: 'PoetsenOne'
        text: 'Aa'
      }
      {
        value: 'yessireebob'
        title: 'Yes Siree Bob'
        text: 'Aa'
      }
    ]
    headerSize: [
      {
        value: 'small'
        text: 'маленький'
      }
      {
        value: 'middle'
        text: 'средний'
      }
      {
        value: 'large'
        text: 'большой'
      }
    ]
    headerColor: [
      {
        value: '#ffffff'
        title: 'Белый'
      }
      {
        value: '#000000'
        title: 'Чёрный'
      }
      {
        value: ':ANY:'
        title: 'Любой'
      }
      {
        value: '#2ac67e'
        title: 'Трилистник'
      }
      {
        value: '#e74c3c'
        title: 'Синнобар'
      }
      {
        value: '#6c7a89'
        title: 'Серо-голубой'
      }
      {
        value: '#38434e'
        title: 'Мэдисон'
      }
    ]
    backgroundColor: [
      {
        value: '#ffffff'
        title: 'Белый'
      }
      {
        value: '#000000'
        title: 'Чёрный'
      }
      {
        value: ':ANY:'
        title: 'Любой'
      }
      {
        value: '#e74c3c'
        title: 'Синнобар'
      }
      {
        value: '#c6c9cc'
        title: 'Серебряный песок'
      }
      {
        value: '#6c7a89'
        title: 'Серо-голубой'
      }
    ]
    backgroundAlignment: [
      {
        value: 'justify'
        text: 'по ширине'
      }
      {
        value: 'center'
        text: 'по центру'
      }
    ]
    feedBackgroundColor: [
      {
        value: '#ffffff'
        title: 'Белый'
      }
      {
        value: '#000000'
        title: 'Чёрный'
      }
      {
        value: ':ANY:'
        title: 'Любой'
      }
      {
        value: '#e74c3c'
        title: 'Синнобар'
      }
      {
        value: '#c6c9cc'
        title: 'Серебряный песок'
      }
      {
        value: '#6c7a89'
        title: 'Серо-голубой'
      }
    ]
    feedFont: [
      {
        value: 'ptsans'
        title: 'PT Sans'
        text: 'Aa'
      }
      {
        value: 'ptserif'
        title: 'PT Serif'
        text: 'Aa'
      }
      {
        value: 'roboto'
        title: 'Roboto'
        text: 'Aa'
      }
      {
        value: 'lora'
        title: 'Lora'
        text: 'Aa'
      }
      {
        value: 'philosopher'
        title: 'Philosopher'
        text: 'Aa'
      }
      {
        value: 'ptmono'
        title: 'PT Mono'
        text: 'Aa'
      }
      {
        value: 'berenisadfpro'
        title: 'Berenis ADF Pro'
        text: 'Aa'
      }
      {
        value: 'djserif'
        title: 'DejaVu Serif Condensed'
        text: 'Aa'
      }
      {
        value: 'heuristica'
        title: 'Heuristica'
        text: 'Aa'
      }
      {
        value: 'permian'
        title: 'Permian Slab Serif'
        text: 'Aa'
      }
      {
        value: 'robotoslab'
        title: 'Roboto Slab'
        text: 'Aa'
      }
      {
        value: 'clearsans'
        title: 'Clear Sans'
        text: 'Aa'
      }
    ]
    feedFontColor: [
      {
        value: '#ffffff'
        title: 'Белый'
      }
      {
        value: '#000000'
        title: 'Чёрный'
      }
      {
        value: '#c6c9cc'
        title: 'Серебряный песок'
      }
      {
        value: '#6c7a89'
        title: 'Серо-голубой'
      }
      {
        value: '#38434e'
        title: 'Мэдисон'
      }
    ]

  getTitle: (option, value) ->
    property = @getProperty option, value
    return property.title if property?.title

  getText: (option, value) ->
    property = @getProperty option, value
    text = property?.text || property?.title
    text

  getProperty: (option, value) ->
    propertyAny = null

    return throw new Error("Неизвестная опция #{option}") unless @options[option]

    for property in @options[option]
      if property.value is ':ANY:' then propertyAny = property
      if property.value is value then return property

    return propertyAny if propertyAny?
    null

module.exports = DesignPresenterService