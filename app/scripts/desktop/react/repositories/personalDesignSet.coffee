DesignSet = require '../entities/designSet'

_designs = {}
# Mock
_designs.current = new DesignSet
  headerFont: "proximanova"
  headerSize: "middle"
  headerColor: "#2c61c1"
  backgroundColor: "#ffffff"
  backgroundImageUrl: "http://taaasty.com/assets/backgrounds/fb/e2/1881243_20140806230841_91475.jpg"
  backgroundImageEnabled: true
  backgroundAlignment: "justify"
  feedBackgroundColor: "#000000"
  feedFont: "ptsans"
  feedFontColor: "#000000"
  feedTransparency: 0.7

PersonalDesignSetRepo =

  get: (setName) ->
    _designs[setName]

  save: (setName, design) ->
    _designs[setName] = design

module.exports = PersonalDesignSetRepo