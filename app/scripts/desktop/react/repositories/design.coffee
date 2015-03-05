_design =
  headerFont: [
    'proximanova', 'notoserif', 'comfortaa', 'airbornepilot', 'amaranth', 'beermoney'
    'dancingscript', 'greatvibes', 'veles', 'zion', 'nautilus', 'ospdin', 'pecita'
    'poetsen', 'yessireebob'
  ]
  headerSize: ['small', 'middle', 'large']
  headerColor: ['#ffffff', '#000000', ':ANY:', '#2ac67e', '#e74c3c', '#6c7a89', '#38434e']
  backgroundColor: ['#ffffff', '#000000', ':ANY:', '#e74c3c', '#c6c9cc', '#6c7a89']
  backgroundAlignment: ['justify', 'center']
  feedBackgroundColor: ['#ffffff', '#000000', ':ANY:', '#e74c3c', '#c6c9cc', '#6c7a89']
  feedFont: [
    'ptsans', 'ptserif', 'roboto', 'lora', 'philosopher', 'ptmono', 'berenisadfpro'
    'djserif', 'heuristica', 'permian', 'robotoslab', 'clearsans'
  ]
  feedFontColor: ['#ffffff', '#000000', '#c6c9cc', '#6c7a89', '#38434e']

DesignRepo =

  get: (option) ->
    _design[option]

  getAll: ->
    _design

module.exports = DesignRepo