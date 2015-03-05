DesignSet = require '../entities/designSet'

_designs = {}
# Mock
_designs.current = new DesignSet
  headerFont: "serif"
  headerSize: "middle"
  headerColor: "#ffffff"
  backgroundColor: "#ffffff"
  backgroundImageUrl: "http://taaasty.ru/assets/backgrounds/8d/4b/1881243_4k_wallpaper_231.jpg"
  backgroundImageEnabled: true
  backgroundAlignment: "justify"
  feedBackgroundColor: "#000000"
  feedFont: "ptsans"
  feedFontColor: "#000000"
  feedTransparency: 0.5

PersonalDesignSetRepo =

  get: (setName) ->
    _designs[setName]

  save: (setName, design) ->
    _designs[setName] = design

module.exports = PersonalDesignSetRepo