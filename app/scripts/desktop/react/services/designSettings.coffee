# design =
#   headerFont: 'comfortaa'
#   headerSize: 'small'
#   headerColor: 'shamrock'
#   backgroundColor: 'white'
#   backgroundImageUrl: 'http://google.ru/img'
#   backgroundImageEnabled: false
#   backgroundAlignment: 'center'
#   feedBackgroundColor: 'silversand'
#   feedFont: 'ptsans'
#   feedFontColor: 'bluegray'
#   feedTransparency: .5

# freeDesign = 
#   headerFont: ['serif', 'sans']
#   headerSize: ['middle']
#   headerColor: ['white', 'black']
#   backgroundColor: ['white', 'black']
#   backgroundAlignment: ['justify', 'center']
#   feedBackgroundColor: ['white', 'black']
#   feedFont: ['ptsans', 'ptserif']
#   feedFontColor: ['white', 'black']
#   backgroundImageUrl: ':ANY:'
#   backgroundImageEnabled: ':ANY:'
#   feedTransparency: ':ANY:'

DesignSettingsService =

  hasPaidValues: (design, freeDesign) ->
    for key, val of design
      continue unless freeDesign[key]
      continue if freeDesign[key] is ':ANY:'
      return true if freeDesign[key].indexOf(val) == -1
    false

module.exports = DesignSettingsService