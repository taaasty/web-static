_ = require 'lodash'
# headerFont (enum) - Шрифт заголовка.
# headerSize (enum) - Размер заголовка.
# headerColor (RGB hex) - Цвет заголовка.
# backgroundColor (RGB hex) - Цвет фона.
# backgroundImageUrl (url) - Фоновая картинка.
# backgroundImageEnabled (bool) - Вкл/Выкл фоновую картинку.
# backgroundAlignment (enum) - Выравнивание фоновой картинки.
# feedBackgroundColor (RGB hex) - Цвет фона ленты.
# feedFont (enum) - Шрифт текста ленты.
# feedFontColor (RGB hex) - Цвет текста ленты.
# feedTransparency (range) - Прозрачность ленты. (0-1)

class Design

  constructor: (data) ->
    _.extend @, data

  headerFont: null
  headerSize: null
  headerColor: null
  backgroundColor: null
  backgroundImageUrl: null
  backgroundImageEnabled: null
  backgroundAlignment: null
  feedBackgroundColor: null
  feedFont: null
  feedFontColor: null
  feedTransparency: null

module.exports = Design