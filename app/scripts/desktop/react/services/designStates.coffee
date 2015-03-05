_ = require 'lodash'
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

DesignStatesService =
  page: document.body
  pageCover: document.querySelector '.page-cover'
  feed: document.querySelector '.content-area__bg'

  states:
    headerFont:             'designtlog-headerfont'
    headerSize:             'designtlog-headersize'
    headerColor:            'designtlog-headercolor'
    backgroundColor:        'designtlog-bgcolor'
    backgroundAlignment:    'designtlog-bgalignment'
    feedBackgroundColor:    'designtlog-feedbgcolor'
    feedFont:               'designtlog-feedfont'
    feedFontColor:          'designtlog-feedcolor'

  switchableStates:
    backgroundImageEnabled: 'designtlog-bgimage-none'

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
      newClass = @states[state] + '-' + value
      classes.push newClass

    _.forEach switchableStates, (value, state) =>
      unless value
        newClass = @switchableStates[state]
        classes.push newClass

    if design.backgroundImageUrl
      @pageCover.style.backgroundImage = 'url("' + design.backgroundImageUrl + '")'

    if _.isNumber design.feedTransparency
      @feed.style.opacity = design.feedTransparency

    @page.className = _.trim classes.join ' '

module.exports = DesignStatesService